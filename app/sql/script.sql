/*
  Sistema : CRM
  Version : 1.0 web
  Proceso : Trigger de actualizacion tabla de actividades del proyecto
  Autor   : I.S.C. Fernando Cuadras 17/Feb/2024
  Ult.Modi.: 12/Marzo/2024
		   : MGSR 13/02/2025 -- se aumento en el mensaje email el asunto
       : FDO 13/02/2025 -- se cambia los estatus a dos caracteres
  */
--CREATE
ALTER
  trigger [dbo].[T_upd_comeapy] on [dbo].[comeapy] 
  for Insert,update,delete as
					--variables del trigger
  
  declare @tpy_tpy char(3)	--Tipo de proyecto
  declare @des_tpy varchar(200)	-- descripcion tipo de proyecto
  declare @per_apy int
  declare @num_pry int		--Número de proyecto
  declare @tap_tap char(6)		--Actividad
  declare @con_apy int		--consecutivo actividad
  declare @ord_act int   -- Orden de la actividad
  declare @fpr_apy DATETIME -- Fecha de programación
  declare @est_apy  char(3) -- Estatus de la actividad
  declare @est_ant  char(3) -- Estatus anterior de la actividad
  DECLARE @fau_apy  datetime --Fecha de autorizacion
  declare @lau_apy  char(32)  -- Login que autorizo
  declare @aut_apy int -- Autorizacion
  declare @usu_usu INT -- Usuario
  declare @key_pri int   --Key Principal 

  -- Tipo de actividades que tien el proyecto
  declare @eqa_tap char(32) -- Equipo de autorizacion
  declare @ord_tap int   -- Orden de la actividad
  declare @amu_tap int   -- Actividad multiple
  declare @are_tap char(3) -- Actividad a reprogramar
  declare @json_tap VARCHAR(1024)    -- Datos Json

  declare @fpo_pge datetime

  DECLARE @sw_tri AS INT  -- Tipo de trigger

  declare @cons int      -- Consecutivo

  declare @car_mess smallint -- Carrier de mensajes
  declare @ema_tap CHAR(128)  -- equipo de trabajo para Email a enviar
  declare @ems_tap char(128) --  equipo de trabajo para Mns a enviar
  declare @mai_equ varchar(4096) --- emails del equipo de trabajo
  declare @tel_equ varchar(256)  -- telefonos del equipo de trabajo
  declare @pos smallint			-- variable de trabajo para obtener posicion de un caracter en una string
  declare @men_err varchar(255)	--Mensaje de error

  set @fpo_pge=CAST(GETDATE() AS DATE)

  SET @sw_tri = 0
  --set @sw_sta =0 

  IF EXISTS ( SELECT * FROM DELETED )
    SET @sw_tri = @sw_tri + 1

  IF EXISTS ( SELECT KEY_PRI FROM INSERTED)
    SET @sw_tri = @sw_tri + 2

IF @sw_tri = 1 -- deleted
  BEGIN
  select @tpy_tpy=tpy_tpy,
    @num_pry=num_pry,
    @per_apy=per_apy,
    @tap_tap=tap_tap,
    @con_apy=con_apy,
    @est_apy=est_apy,
    @fpr_apy=fpr_apy,
    @fau_apy=fau_apy,
    @lau_apy=lau_apy,
    @aut_apy=aut_apy,
    @usu_usu=usu_usu,
    @key_pri=key_pri
  from deleted


   set @est_ant=est_apy-- Estaus anterior de la actividad
   
  select top 1 @key_pri=comeapy.key_pri,@tap_tap=comeapy.tap_tap from comeapy 
    join cometap on  comeapy.tpy_tpy=cometap.tpy_tpy and comeapy.tap_tap=cometap.tap_tap 
   where comeapy.tpy_tpy=@tpy_tpy and num_pry=@num_pry and per_apy=@per_apy and cometap.ord_tap<>0 order by con_apy desc

   if @key_pri>0
   begin
    if (select eau_tap from cometap where tpy_tpy=@tpy_tpy and tap_tap=@tap_tap)='AU' -- Si es actividad de autorizacion
      update comeapy set est_apy='AU' where key_pri=@key_pri
    else  
      update comeapy set est_apy='PR' where key_pri=@key_pri
    RETURN
   end 


  if @est_apy<>'IN'
    BEGIN
    set @men_err='Can`t delete activity '
    raiserror(@men_err,16,1)
    rollback
    return
  end
END


IF @sw_tri > 1 -- inserted,updated
  BEGIN
    select @tpy_tpy=inserted.tpy_tpy,
        @num_pry=inserted.num_pry,
        @per_apy=per_apy,
        @tap_tap=inserted.tap_tap,
        @con_apy=inserted.con_apy,
        @est_apy=inserted.est_apy,
        @fpr_apy=inserted.fpr_apy,
        @fau_apy=inserted.fau_apy,
        @lau_apy=inserted.lau_apy,
        @aut_apy=inserted.aut_apy,
        @json_tap=inserted.dat_apy,
        @usu_usu=usu_usu,
        @key_pri=key_pri
    from inserted
  
    update comepry set est_pry='PR'
        where tpy_tpy=@tpy_tpy and num_pry=@num_pry  and est_pry='IN'   --and per_pry=@per_apy

  -- datos generales de la actividad
    select @eqa_tap=eqa_tap,
        @ord_tap=ord_tap, -- Orden actividad
        @amu_tap=amu_tap,
        @are_tap=are_tap,
        @car_mess=car_mess, -- carrier de mensajes
        @ema_tap=ema_tap,  -- email a enviar
        @ems_tap=ems_tap -- msm a enviar
    from cometap
    where tpy_tpy=@tpy_tpy and tap_tap=@tap_tap

  --------< generamos mensages del vendedor y grupo de trabajo >-----
    if @sw_tri=2 
        begin
            declare @tel_ven CHAR(32)
            declare @mai_ven char(128)
            declare @txt_mess varchar(max)
            declare @dat_nom varchar(2048)
            declare @proyecto varchar(1024)
            declare @ven_ven int
            declare @des_mess varchar(1024)
            declare @dat_mess varchar(1024)
	        declare @asu_mess varchar(1024)
    
            set @dat_mess=dbo.f_obt_dat_json(@json_tap)
/*  
    select @car_mess=car_mess, @ema_tap=ema_tap, @ems_tap=ems_tap
    from cometap
    where tpy_tpy=@tpy_tpy and tap_tap=@tap_tap
*/
            if (rtrim(@car_mess))>0 -- Si hay carrier de envio de mensajes
                begin   
           -- Obtenemos datos del proyecto
                    select @dat_nom=cli_pry, @proyecto=rtrim(tit_pry)+cast(num_pry as char(10)), @ven_ven=ven_ven,@des_tpy=des_tpy
                    from vi_rep_comepry_g
                    where tpy_tpy=@tpy_tpy and num_pry=@num_pry

                    set @txt_mess='Proyecto: '+rtrim(@proyecto) +
                    '.'+(select rtrim(des_tap) from cometac where tap_tap=@tap_tap) +  
                    ' Datos: '+rtrim(@dat_nom) +@dat_mess


                    if @ven_ven>0
                        begin

                            select @tel_ven=tel_ven, @mai_ven=mai_ven
                            from comeven
                            where ven_ven=@ven_ven

                            -- Envia msn al vendedor
                            if (@car_mess>=4 and rtrim(@tel_ven)>' ') 
                                begin
                                    set @des_mess=@tel_ven
                                    -- inserta mensaje para el vendedor
                                    insert into pry_messages
                                    (ref_mess,des_mess,txt_mess,car_mess,usu_usu,tie_uac,usu_cre,tie_cre)
                                    VALUES
                                    ('', @des_mess, @txt_mess, 4, @usu_usu, GETDATE(), @usu_usu, GETDATE() )
                                    set @car_mess=@car_mess-4
                                 end

                            -- Envia mail al vendedor
                            if (@car_mess>=2 and rtrim(@mai_ven)>' ') 
                                begin
                                    set @des_mess=@mai_ven
                                    -- inserta mensaje para el vendedor
                                    insert into pry_messages
                                    (ref_mess,des_mess,txt_mess,car_mess,asu_mess,usu_usu,tie_uac,usu_cre,tie_cre)
                                    VALUES
                                    ('', @des_mess, @txt_mess, 2,rtrim(@des_tpy)+': '+@proyecto, @usu_usu, GETDATE(), @usu_usu, GETDATE() )
                                    set @car_mess=@car_mess-2

                                end

                            -- Envia whatsApp al vendedor
                            if (@car_mess>=1 and rtrim(@tel_ven)>' ' ) 
                                begin
                                    set @des_mess=@tel_ven
                                    -- inserta mensaje para el vendedor
                                    insert into pry_messages
                                    (ref_mess,des_mess,txt_mess,car_mess,usu_usu,tie_uac,usu_cre,tie_cre)
                                    VALUES
                                    ('',@des_mess, @txt_mess, 1, @usu_usu, GETDATE(), @usu_usu, GETDATE() )
                                end
                        end
                end


            -- envio de mail 
	        select @mai_equ=mai_equ from db_equipo where equ_equ=@ema_tap
            if (rtrim(@mai_equ))>'  ' 
                BEGIN

                    set @des_mess=@mai_equ
                    insert into pry_messages
                    (ref_mess,des_mess,txt_mess,car_mess,asu_mess,usu_usu,tie_uac,usu_cre,tie_cre)
                    VALUES
                    ('', @des_mess, @txt_mess, 2,rtrim(@des_tpy)+': '+@proyecto, @usu_usu, GETDATE(), @usu_usu, GETDATE() )
                end

            -- envio de msn
	        select @tel_equ=tel_equ from db_equipo where equ_equ=@ems_tap

            if (rtrim(@tel_equ))>'  '
		        BEGIN
			        set @pos=1
			        if RIGHT(rtrim(@tel_equ),1)<>','
				        set @tel_equ=rtrim(@tel_equ)+','
			
                    while @pos>0
			            begin
			                if CHARINDEX(',',@tel_equ,@pos)>0
				                begin
						            set @des_mess=substring(@tel_equ,@pos,CHARINDEX(',',@tel_equ,@pos)-@pos)
						            insert into pry_messages
						            (ref_mess,des_mess,txt_mess,car_mess,usu_usu,tie_uac,usu_cre,tie_cre)
						            VALUES
						            ('', @des_mess, @txt_mess, 4, @usu_usu, GETDATE(), @usu_usu, GETDATE() )
   						            set @pos=CHARINDEX(',',@tel_equ,@pos)+1
					            end
				            else 
				                set @POS=0


			            end
		        end
    end
 --------< Fin generamos mensages dll vendedor y grupo de trabajo >-----
end
-- Inserted
if  @sw_tri=2 -- El primer estaus no debe ser diferente a 'I'
  begin
  print 'only inserted T_upd_comeapy key_pri='+cast(@key_pri as char)
  if @est_apy<>'IN'
    BEGIN

    set @men_err='Invalid status'
    raiserror(@men_err,16,1)
    rollback
    return
  end
  return
END


if @sw_tri=3 and update(est_apy)  -- trigger update Hubo cambio de estatus
 
 -- updated
  BEGIN
  print 'only updated T_upd_comeapy'+cast(@key_pri as char)

  -- Si cambia a Autorizacion checa si es el equipo que autoriza
  if  @est_apy='AU' or @est_apy='CA' or @est_apy='BL' --Autoriza, Cancela o Bloquea
    BEGIN

        if @est_ant='FI' or @est_ant='RE'
           BEGIN
            set @men_err='You can not change status when finished or rescheduled'
            raiserror(@men_err,16,1)
            rollback
            return
        END

        if @fau_apy<>@fpo_pge
          BEGIN
            set @men_err='Invalid change status date'
            raiserror(@men_err,16,1)
            rollback
            return
        END

      -- Checa si el usuario puede cambiar el estatus
        if @aut_apy=0 or not exists(select 1 from man_cometap tap 
            where tpy_tpy=@tpy_tpy and tap_tap=@tap_tap  and exists(select key_pri from man_db_equusu equ where 
            equ.equ_equ=tap.eqa_tap))
          BEGIN
            set @men_err='You can`t change the status of this activity, you are not authorized'
            raiserror(@men_err,16,1)
            rollback
            return
        END    

    END
    --@est_apy='A'

    
  END
  
  -- Reprogramar o Finalizar


  if (@est_apy='FI' or @est_apy='CA'or @est_apy='BL' ) and @eqa_tap>'       ' and (select aut_apy
    from deleted )=0  --No hay autorizacion
     BEGIN
    set @men_err='Actividad no autorizada'
    raiserror(@men_err,16,1)
    rollback
    return
  END

  if(@est_apy='RE' or (@est_apy='FI' and @ord_tap>0)) -- Inserta nueva actividad
      BEGIN
       print '============================================'
    print 'Actividad a reprogramar are_tap='+@are_tap
    print 'Actividad a reprogramar tap_tap='+@tap_tap
    print '============================================'

      if @est_apy='RE' 
        BEGIN
        if @are_tap='...'
            BEGIN
              set @men_err='No se puede reprogramar la actividad'
              raiserror(@men_err,16,1)
              rollback
              return
            END
      set @tap_tap=@are_tap
    -- Actividad a reprogramar
      END  


      ELSE
      -- Siguiente actividad
        BEGIN
      if @ord_tap>0 -- Si tiene orden
          begin
        set @tap_tap=''
        select top 1
          @tap_tap=tap_tap,
          @json_tap=json_tap
        from vi_cap_cometap
        where tpy_tpy=@tpy_tpy and ord_tap>@ord_tap
        order by ord_tap

        print 'Siguiente actividad '+@tap_tap+ ' orden='+cast(@ord_act as char)
        set @amu_tap=1

      end

    END
/******************** Fin modificacion *****************************************/

    if (@tap_tap>'   ' and @amu_tap=1 ) -- Hay actividad a generar
        BEGIN


      select @con_apy=max(con_apy)+1
      from man_comeapy
      where tpy_tpy=@tpy_tpy and num_pry=@num_pry and per_apy=@per_apy
      /*      if exists( select key_pri from comeapy 
                      where  @tpy_tpy=tpy_tpy and  @num_pry=num_pry and 
                            @tap_tap=tap_tap and @con_apy=con_apy and @per_apy=per_apy  ) or 1=1
         BEGIN
           return

      END   
*/
 --print 'Se insertara actividad '+@tap_tap

      insert into comeapy
        ( tpy_tpy, num_pry, con_apy, per_apy, tap_tap, fec_apy,est_apy,dat_apy , obs_apy, fco_apy , fce_apy , fpr_apy ,tdo_tdo,ndo_doc,ord_tap, fma_apy, fdo_apy, fms_apy,lau_apy,fau_apy, aut_apy,usu_usu,tie_uac,usu_cre,tie_cre)
      SELECT @tpy_tpy, @num_pry, @con_apy, @per_apy, @tap_tap, @fpo_pge, 'IN', @json_tap, '      ', '19000101', getdate(), getdate(), '  '  , 0, @ord_tap, '19000101', '19000101', '19000101', '    ', '19000101', 0, @usu_usu, GETDATE(), @usu_usu, GETDATE()


      -- print 'se Inserto renglon'+@tap_tap+' Consecutivo ='+cast(@con_apy as char)+' Tiempo='+CAST(GETDATE() AS CHAR)
      return


    END

  END
  -- Inserta nueva actividad

  print 'end only updated T_upd_comeapy'+cast(@key_pri as char)

end
