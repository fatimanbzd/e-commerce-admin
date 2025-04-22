export function downloadFileHelper(
  file: { file: string; fileName: string } | any,
) {
  const fileExtension = file.fileName.split('.').pop();
  let mimeType = 'application/octet-stream';
  if (fileExtension === 'pdf') {
    mimeType = 'application/pdf';
  } else if (fileExtension === 'png') {
    mimeType = 'image/png';
  } else if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
    mimeType = 'image/jpeg';
  } else if (fileExtension === 'excel') {
    mimeType = 'application/excel';
  }
  const source = `data:${mimeType};base64,${file.file}`;
  const link = document.createElement('a');
  link.href = source;
  link.download = file.fileName;
  link.click();
}
