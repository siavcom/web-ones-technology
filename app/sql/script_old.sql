ALTER TRIGGER [dbo].[T_upd_comeapy]
    ON [dbo].[comeapy]
    FOR INSERT, UPDATE, DELETE
    AS --variables del trigger
       DECLARE @tpy_tpy AS CHAR (3); --Tipo de proyecto
       DECLARE @des_tpy AS VARCHAR (200); -- descripcion tipo de proyecto
       DECLARE @per_apy AS INT;
       DECLARE @num_pry AS INT; --Número de proyecto
       DECLARE @tap_tap AS CHAR (6); --Actividad
       DECLARE @con_apy AS INT; --consecutivo actividad
       DECLARE @ord_act AS INT; -- Orden de la actividad
       DECLARE @fpr_apy AS DATETIME; -- Fecha de programación
       DECLARE @est_apy AS CHAR (3); -- Estatus de la actividad
       DECLARE @fau_apy AS DATETIME; --Fecha de autorizacion
       DECLARE @lau_apy AS CHAR (32); -- Login que autorizo
       DECLARE @aut_apy AS INT; -- Autorizacion
       DECLARE @usu_usu AS INT; -- Usuario
       DECLARE @key_pri AS INT; --Key Principal 
       -- Tipo de actividades que tien el proyecto
       DECLARE @eqa_tap AS CHAR (32); -- Equipo de autorizacion
       DECLARE @ord_tap AS INT; -- Orden de la actividad
       DECLARE @amu_tap AS INT; -- Actividad multiple
       DECLARE @are_tap AS CHAR (3); -- Actividad a reprogramar
       DECLARE @json_tap AS VARCHAR (1024); -- Datos Json
       DECLARE @fpo_pge AS DATETIME;
       DECLARE @sw_tri AS INT; -- Tipo de trigger
       DECLARE @cons AS INT; -- Consecutivo
       DECLARE @car_mess AS SMALLINT; -- Carrier de mensajes
       DECLARE @ema_tap AS CHAR (128); -- equipo de trabajo para Email a enviar
       DECLARE @ems_tap AS CHAR (128); --  equipo de trabajo para Mns a enviar
       DECLARE @mai_equ AS VARCHAR (4096); --- emails del equipo de trabajo
       DECLARE @tel_equ AS VARCHAR (256); -- telefonos del equipo de trabajo
       DECLARE @pos AS SMALLINT; -- variable de trabajo para obtener posicion de un caracter en una string
       DECLARE @men_err AS VARCHAR (255); --Mensaje de error
       SET @fpo_pge = CAST (GETDATE() AS DATE);
       SET @sw_tri = 0;
       --set @sw_sta =0 
       IF EXISTS (SELECT *
                  FROM   DELETED)
           SET @sw_tri = @sw_tri + 1;
       IF EXISTS (SELECT KEY_PRI
                  FROM   INSERTED)
           SET @sw_tri = @sw_tri + 2;
       IF @sw_tri = 1 -- deleted
           BEGIN
               SELECT @tpy_tpy = tpy_tpy,
                      @num_pry = num_pry,
                      @per_apy = per_apy,
                      @tap_tap = tap_tap,
                      @con_apy = con_apy,
                      @est_apy = est_apy,
                      @fpr_apy = fpr_apy,
                      @fau_apy = fau_apy,
                      @lau_apy = lau_apy,
                      @aut_apy = aut_apy,
                      @usu_usu = usu_usu,
                      @key_pri = key_pri
               FROM   deleted;
               SELECT   TOP 1 @key_pri = comeapy.key_pri,
                              @tap_tap = comeapy.tap_tap
               FROM     comeapy
                        INNER JOIN
                        cometap
                        ON comeapy.tpy_tpy = cometap.tpy_tpy
                           AND comeapy.tap_tap = cometap.tap_tap
               WHERE    comeapy.tpy_tpy = @tpy_tpy
                        AND num_pry = @num_pry
                        AND per_apy = @per_apy
                        AND cometap.ord_tap <> 0
               ORDER BY con_apy DESC;
               IF @key_pri > 0
                   BEGIN
                       IF (SELECT eau_tap
                           FROM   cometap
                           WHERE  tpy_tpy = @tpy_tpy
                                  AND tap_tap = @tap_tap) = 'AU' -- Si es actividad de autorizacion
                           UPDATE comeapy
                           SET    est_apy = 'AU'
                           WHERE  key_pri = @key_pri;
                       ELSE
                           UPDATE comeapy
                           SET    est_apy = 'PR'
                           WHERE  key_pri = @key_pri;
                       RETURN;
                   END
               IF @est_apy <> 'IN'
                   BEGIN
                       SET @men_err = 'Can`t delete activity ';
                       RAISERROR (@men_err, 16, 1);
                       ROLLBACK;
                       RETURN;
                   END
           END
       IF @sw_tri > 1 -- inserted,updated
           BEGIN
               SELECT @tpy_tpy = inserted.tpy_tpy,
                      @num_pry = inserted.num_pry,
                      @per_apy = per_apy,
                      @tap_tap = inserted.tap_tap,
                      @con_apy = inserted.con_apy,
                      @est_apy = inserted.est_apy,
                      @fpr_apy = inserted.fpr_apy,
                      @fau_apy = inserted.fau_apy,
                      @lau_apy = inserted.lau_apy,
                      @aut_apy = inserted.aut_apy,
                      @json_tap = inserted.dat_apy,
                      @usu_usu = usu_usu,
                      @key_pri = key_pri
               FROM   inserted;
               UPDATE comepry
               SET    est_pry = 'PR'
               WHERE  tpy_tpy = @tpy_tpy
                      AND num_pry = @num_pry
                      AND est_pry = 'IN'; --and per_pry=@per_apy
               PRINT 'Uno';
               -- datos generales de la actividad
               SELECT @eqa_tap = eqa_tap,
                      @ord_tap = ord_tap, -- Orden actividad
                      @amu_tap = amu_tap,
                      @are_tap = are_tap,
                      @car_mess = car_mess, -- carrier de mensajes
                      @ema_tap = ema_tap, -- email a enviar
                      @ems_tap = ems_tap -- msm a enviar
               FROM   cometap
               WHERE  tpy_tpy = @tpy_tpy
                      AND tap_tap = @tap_tap;
               PRINT 'Dos';
               --------< generamos mensages del vendedor y grupo de trabajo >-----
               IF @sw_tri = 2
                   BEGIN
                       DECLARE @tel_ven AS CHAR (32);
                       DECLARE @mai_ven AS CHAR (128);
                       DECLARE @txt_mess AS VARCHAR (MAX);
                       DECLARE @dat_nom AS VARCHAR (2048);
                       DECLARE @proyecto AS VARCHAR (1024);
                       DECLARE @ven_ven AS INT;
                       DECLARE @des_mess AS VARCHAR (1024);
                       DECLARE @dat_mess AS VARCHAR (1024);
                       DECLARE @asu_mess AS VARCHAR (1024);
                       SET @dat_mess = dbo.f_obt_dat_json(@json_tap);
                       /*  
    select @car_mess=car_mess, @ema_tap=ema_tap, @ems_tap=ems_tap
    from cometap
    where tpy_tpy=@tpy_tpy and tap_tap=@tap_tap
*/
                       IF (rtrim(@car_mess)) > 0 -- Si hay carrier de envio de mensajes
                           BEGIN
                               -- Obtenemos datos del proyecto
                               SELECT @dat_nom = cli_pry,
                                      @proyecto = rtrim(tit_pry) + CAST (num_pry AS CHAR (10)),
                                      @ven_ven = ven_ven,
                                      @des_tpy = des_tpy
                               FROM   vi_rep_comepry_g
                               WHERE  tpy_tpy = @tpy_tpy
                                      AND num_pry = @num_pry;
                               SET @txt_mess = 'Proyecto: ' + rtrim(@proyecto) + '.' + (SELECT rtrim(des_tap)
                                                                                        FROM   cometac
                                                                                        WHERE  tap_tap = @tap_tap) + ' Datos: ' + rtrim(@dat_nom) + @dat_mess;
                               IF @ven_ven > 0
                                   BEGIN
                                       SELECT @tel_ven = tel_ven,
                                              @mai_ven = mai_ven
                                       FROM   comeven
                                       WHERE  ven_ven = @ven_ven;
                                       -- Envia msn al vendedor
                                       IF (@car_mess >= 4
                                           AND rtrim(@tel_ven) > ' ')
                                           BEGIN
                                               SET @des_mess = @tel_ven;
                                               -- inserta mensaje para el vendedor
                                               INSERT  INTO pry_messages (
                                                   ref_mess,
                                                   des_mess,
                                                   txt_mess,
                                                   car_mess,
                                                   usu_usu,
                                                   tie_uac,
                                                   usu_cre,
                                                   tie_cre
                                               )
                                               VALUES                   ('', @des_mess, @txt_mess, 4, @usu_usu, GETDATE(), @usu_usu, GETDATE());
                                               SET @car_mess = @car_mess - 4;
                                           END
                                       -- Envia mail al vendedor
                                       IF (@car_mess >= 2
                                           AND rtrim(@mai_ven) > ' ')
                                           BEGIN
                                               SET @des_mess = @mai_ven;
                                               -- inserta mensaje para el vendedor
                                               INSERT  INTO pry_messages (
                                                   ref_mess,
                                                   des_mess,
                                                   txt_mess,
                                                   car_mess,
                                                   asu_mess,
                                                   usu_usu,
                                                   tie_uac,
                                                   usu_cre,
                                                   tie_cre
                                               )
                                               VALUES                   ('', @des_mess, @txt_mess, 2, rtrim(@des_tpy) + ': ' + @proyecto, @usu_usu, GETDATE(), @usu_usu, GETDATE());
                                               SET @car_mess = @car_mess - 2;
                                           END
                                       -- Envia whatsApp al vendedor
                                       IF (@car_mess >= 1
                                           AND rtrim(@tel_ven) > ' ')
                                           BEGIN
                                               SET @des_mess = @tel_ven;
                                               -- inserta mensaje para el vendedor
                                               INSERT  INTO pry_messages (
                                                   ref_mess,
                                                   des_mess,
                                                   txt_mess,
                                                   car_mess,
                                                   usu_usu,
                                                   tie_uac,
                                                   usu_cre,
                                                   tie_cre
                                               )
                                               VALUES                   ('', @des_mess, @txt_mess, 1, @usu_usu, GETDATE(), @usu_usu, GETDATE());
                                           END
                                   END
                           END
                       -- envio de mail 
                       SELECT @mai_equ = mai_equ
                       FROM   db_equipo
                       WHERE  equ_equ = @ema_tap;
                       IF (rtrim(@mai_equ)) > '  '
                           BEGIN
                               SET @des_mess = @mai_equ;
                               INSERT  INTO pry_messages (
                                   ref_mess,
                                   des_mess,
                                   txt_mess,
                                   car_mess,
                                   asu_mess,
                                   usu_usu,
                                   tie_uac,
                                   usu_cre,
                                   tie_cre
                               )
                               VALUES                   ('', @des_mess, @txt_mess, 2, rtrim(@des_tpy) + ': ' + @proyecto, @usu_usu, GETDATE(), @usu_usu, GETDATE());
                           END
                       -- envio de msn
                       SELECT @tel_equ = tel_equ
                       FROM   db_equipo
                       WHERE  equ_equ = @ems_tap;
                       IF (rtrim(@tel_equ)) > '  '
                           BEGIN
                               SET @pos = 1;
                               IF RIGHT(rtrim(@tel_equ), 1) <> ','
                                   SET @tel_equ = rtrim(@tel_equ) + ',';
                               WHILE @pos > 0
                                   BEGIN
                                       IF CHARINDEX(',', @tel_equ, @pos) > 0
                                           BEGIN
                                               SET @des_mess = substring(@tel_equ, @pos, CHARINDEX(',', @tel_equ, @pos) - @pos);
                                               INSERT  INTO pry_messages (
                                                   ref_mess,
                                                   des_mess,
                                                   txt_mess,
                                                   car_mess,
                                                   usu_usu,
                                                   tie_uac,
                                                   usu_cre,
                                                   tie_cre
                                               )
                                               VALUES                   ('', @des_mess, @txt_mess, 4, @usu_usu, GETDATE(), @usu_usu, GETDATE());
                                               SET @pos = CHARINDEX(',', @tel_equ, @pos) + 1;
                                           END
                                       ELSE
                                           SET @POS = 0;
                                   END
                           END
                   END --------< Fin generamos mensages dll vendedor y grupo de trabajo >-----
           END
       -- Inserted
       IF @sw_tri = 2 -- El primer estaus no debe ser diferente a 'I'
           BEGIN
               PRINT 'only inserted T_upd_comeapy key_pri=' + CAST (@key_pri AS CHAR);
               IF @est_apy <> 'IN'
                   BEGIN
                       SET @men_err = 'Invalid status';
                       RAISERROR (@men_err, 16, 1);
                       ROLLBACK;
                       RETURN;
                   END
               RETURN;
           END
       IF @sw_tri = 3
          AND UPDATE (est_apy) -- Hubo cambio de estatus
           -- updated
           BEGIN
               PRINT 'only updated T_upd_comeapy' + CAST (@key_pri AS CHAR);
               -- Si cambia a Autorizacion checa si es el equipo que autoriza
               IF @est_apy = 'AU'
                  OR @est_apy = 'CA'
                  OR @est_apy = 'BL' --Autoriza, Cancela o Bloquea
                   BEGIN
                       IF @est_apy = 'AU'
                           BEGIN
                               IF (@aut_apy = 0
                                   OR @lau_apy <> CURRENT_USER)
                                   BEGIN
                                       SET @men_err = 'You can not change status when finished or rescheduled';
                                       RAISERROR (@men_err, 16, 1);
                                       ROLLBACK;
                                       RETURN;
                                   END
                               IF @fau_apy <> @fpo_pge
                                   BEGIN
                                       SET @men_err = 'Invalid change status date';
                                       RAISERROR (@men_err, 16, 1);
                                       ROLLBACK;
                                       RETURN;
                                   END
                           END
                       --@est_apy='A'
                       IF NOT EXISTS (SELECT est_apy
                                      FROM   deleted)
                          OR (SELECT est_apy
                              FROM   deleted) = 'FI'
                          OR (SELECT est_apy
                              FROM   deleted) = 'RE'
                           BEGIN
                               SET @men_err = 'You can not change status when finished or rescheduled';
                               RAISERROR (@men_err, 16, 1);
                               ROLLBACK;
                               RETURN;
                           END
                       IF @eqa_tap > '           '
                          AND NOT EXISTS (SELECT equ_equ
                                          FROM   vi_cap_db_equusu
                                          WHERE  equ_equ = @eqa_tap
                                                 AND log_usu = CURRENT_USER)
                           BEGIN
                               SET @men_err = 'You can not authorize, block or cancel';
                               RAISERROR (@men_err, 16, 1);
                               ROLLBACK;
                               RETURN;
                           END
                   END
               -- if (@est_apy='A' or @est_apy='C' or @est_apy='B') --Autoriza, Cancela o Bloquea
               -- Reprogramar o Finalizar
               IF (@est_apy = 'FI'
                   OR @est_apy = 'CA'
                   OR @est_apy = 'BL')
                  AND @eqa_tap > '       '
                  AND (SELECT aut_apy
                       FROM   deleted) = 0 --No hay autorizacion
                   BEGIN
                       SET @men_err = 'Actividad no autorizada';
                       RAISERROR (@men_err, 16, 1);
                       ROLLBACK;
                       RETURN;
                   END
               IF (@est_apy = 'RE'
                   OR (@est_apy = 'FI'
                       AND @ord_tap > 0)) -- Inserta nueva actividad
                   BEGIN
                       PRINT '============================================';
                       PRINT 'Actividad a reprogramar are_tap=' + @are_tap;
                       PRINT 'Actividad a reprogramar tap_tap=' + @tap_tap;
                       PRINT '============================================';
                       IF @est_apy = 'RE'
                           BEGIN
                               IF @are_tap = '...'
                                   BEGIN
                                       SET @men_err = 'No se puede reprogramar la actividad';
                                       RAISERROR (@men_err, 16, 1);
                                       ROLLBACK;
                                       RETURN;
                                   END
                               SET @tap_tap = @are_tap; -- Actividad a reprogramar
                           END
                       ELSE
                           -- Siguiente actividad
                           BEGIN
                               IF @ord_tap > 0 -- Si tiene orden
                                   BEGIN
                                       SET @tap_tap = '';
                                       SELECT   TOP 1 @tap_tap = tap_tap,
                                                      @json_tap = json_tap
                                       FROM     vi_cap_cometap
                                       WHERE    tpy_tpy = @tpy_tpy
                                                AND ord_tap > @ord_tap
                                       ORDER BY ord_tap;
                                       PRINT 'Siguiente actividad ' + @tap_tap + ' orden=' + CAST (@ord_act AS CHAR);
                                       SET @amu_tap = 1;
                                   END
                           END
                       IF (@tap_tap > '   '
                           AND @amu_tap = 1) -- Hay actividad a generar
                           BEGIN
                               SELECT @con_apy = max(con_apy) + 1
                               FROM   man_comeapy
                               WHERE  tpy_tpy = @tpy_tpy
                                      AND num_pry = @num_pry
                                      AND per_apy = @per_apy;
                               --print 'Se insertara actividad '+@tap_tap
                               INSERT INTO comeapy (
                                   tpy_tpy,
                                   num_pry,
                                   con_apy,
                                   per_apy,
                                   tap_tap,
                                   fec_apy,
                                   est_apy,
                                   dat_apy,
                                   obs_apy,
                                   fco_apy,
                                   fce_apy,
                                   fpr_apy,
                                   tdo_tdo,
                                   ndo_doc,
                                   ord_tap,
                                   fma_apy,
                                   fdo_apy,
                                   fms_apy,
                                   lau_apy,
                                   fau_apy,
                                   aut_apy,
                                   usu_usu,
                                   tie_uac,
                                   usu_cre,
                                   tie_cre
                               )
                               SELECT @tpy_tpy,
                                      @num_pry,
                                      @con_apy,
                                      @per_apy,
                                      @tap_tap,
                                      @fpo_pge,
                                      'IN',
                                      @json_tap,
                                      '      ',
                                      '19000101',
                                      getdate(),
                                      getdate(),
                                      '  ',
                                      0,
                                      @ord_tap,
                                      '19000101',
                                      '19000101',
                                      '19000101',
                                      '    ',
                                      '19000101',
                                      0,
                                      @usu_usu,
                                      GETDATE(),
                                      @usu_usu,
                                      GETDATE();
                               -- print 'se Inserto renglon'+@tap_tap+' Consecutivo ='+cast(@con_apy as char)+' Tiempo='+CAST(GETDATE() AS CHAR)
                               RETURN;
                           END
                   END
               -- Inserta nueva actividad
               PRINT 'end only updated T_upd_comeapy' + CAST (@key_pri AS CHAR);
           END
       PRINT 'end T_upd_comeapy key_pri=' + CAST (@key_pri AS CHAR) + CAST (GETDATE() AS CHAR);