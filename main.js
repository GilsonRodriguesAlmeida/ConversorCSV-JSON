let reader = '';
let parsedData = null;
let dataConvert = null;
let formatConvert = null;

function handleFile(files) {
    reader = new FileReader();
    reader.onload = (e) => {
        let data = e.target.result;
        //exibir elementos na textArea
        document.querySelector("#preview").value = data;

        //armazenar os dados convertidos para acesso posterior
        parsedData = Papa.parse(data, { header: true}).data;

        //habilita os botões apos carregar o arquivo
        document.querySelector("#convertBtnJson").disabled = false;
        document.querySelector("#convertBtnCsv").disabled = false;
        document.querySelector("#downloadBtn").disabled = false;
    }
    reader.readAsText(files[0])
}

function convertData() {
    // Aqui você pode acessar os dados convertidos e fazer o que precisar
    console.log(parsedData);
    // Exemplo: Exibindo os dados em uma janela de alerta
    console.log(JSON.stringify(parsedData));
}

function convertDataCsv() {
    // Converte os dados para CSV usando Papa.unparse
    const csvData = Papa.unparse(parsedData);
    console.log(csvData)
}

function converterParaFormato(formato) {
    // Verifica o formato e converte os dados
    if (formato === 'csv') {
        dataConvert = Papa.unparse(parsedData);
        formatConvert = 'csv'
    } else if (formato === 'json') {
        dataConvert = JSON.stringify(parsedData, null, 2);
        formatConvert = 'json'
    }
}

function downloadData() {
    if (dataConvert && formatConvert) {
        //Chama a função de download correspondente com base no formato
        downloadArquivo(dataConvert, `dados.${formatConvert}`, formatConvert === 'csv' ? 'text/csv' : 'application/json');
    }
    console.log(dataConvert)
}


function downloadArquivo(data, filename, type) {
    // Cria um Blob com os dados convertidos
    const blob = new Blob([data], { type: type });

    // Cria um URL temporário para o Blob
    const url = window.URL.createObjectURL(blob);

    // Cria um link de download dinâmico
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;

    // Adiciona o link ao corpo do documento
    document.body.appendChild(a);

    // Aciona o clique no link
    a.click();

    // Remove o link do corpo do documento
    document.body.removeChild(a);

    // Libera o URL temporário
    window.URL.revokeObjectURL(url);
}
