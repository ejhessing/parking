function printContent (info) {
  let restorePage = document.body.innerHTML
  let printContent = document.getElementById(info).innerHTML
  document.body.innerHTML = printContent
  window.print()
  document.body.innerHTML = restorePage
}
