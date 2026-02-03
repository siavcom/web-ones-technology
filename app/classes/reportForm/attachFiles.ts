export async function attachFiles(thisForm: {}) {
  //this.Form.report.displayPdf.prop.Value.length <= 10

  if (!thisForm.Form.report.displayPdf.prop.Visible)
    return

  let m: any = {}
  const attachments = []

  // Convert the Buffer to a Base64 string
  const nodeBuffer = thisForm.report.displayPdf.prop.Source

  const bytes = new Uint8Array(nodeBuffer);
  // Convert the Uint8Array to a binary string
  const binaryString = String.fromCharCode(...bytes);
  // Encode the binary string to Base64
  const base64String = btoa(binaryString);

  let fileName = thisForm.prop.Caption
  if (View.vi_cap_comedoc) {
    m = {
      tdo_tdo: thisForm.op_tdo_tdo.prop.Value,
      ndo_doc: thisForm.ndo_doc.prop.Value
    }
    fileName = `cfdi_${m.tdo_tdo}_${m.ndo_doc}.pdf`
  }
  attachments.push({
    fileName,
    type: 'pdf',
    fileB64: true,
    file: base64String
  })


  if (View.vi_cap_comedoc) {
    const data = await localAlaSql(`select cop_nom,cod_nom,tdo_tdo,ndo_doc from vi_cap_comedoc `)
    if (data.length > 0) {
      m.cop_nom = data[0].cop_nom;
      m.cod_nom = data[0].cod_nom;
      m.tdo_tdo = data[0].tdo_tdo;
      m.ndo_doc = data[0].ndo_doc;

      const res = await SQLExec(`select cfd_xml from vi_cap_comexml where tdo_tdo='${m.tdo_tdo}' 
          and ndo_doc=${m.ndo_doc}`)

      if (res.length > 0 && res[0].cfd_xml.length > 10) {
        attachments.push({
          fileName: `cfdi_${m.tdo_tdo}_${m.ndo_doc}.xml`,
          type: 'xml',
          fileB64: false,
          file: res[0].cfd_xml
        })
      }

    }

  }

  return attachments

}
