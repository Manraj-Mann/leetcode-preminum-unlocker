
function callfunctions() {

  let url = window.location.href;
  console.log(url);

  let formData = new FormData();
  formData.append('url', url);

  fetch('https://manrajmann.pythonanywhere.com/facebook', {
    method: 'POST',
    body: formData
  })
    .then(response => response.json())
    .then(data => {

      console.log(data.data.Solution);

    })

}
function main() {

  callfunctions();

}


main()

