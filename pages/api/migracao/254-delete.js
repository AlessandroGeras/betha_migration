const sql = require('mssql');
const dotenv = require('dotenv');
const fetch = require('node-fetch');
const fs = require('fs');

dotenv.config();

async function connectToSqlServer() {
    try {
        const server = process.env.SERVER;
        const database = process.env.DATABASE;
        const username = process.env.USERNAME_SQLSERVER;
        const password = process.env.PASSWORD;

        const config = {
            user: username,
            password: password,
            server: server,
            database: database,
            options: {
                encrypt: false
            }
        };

        const pool = await sql.connect(config);
        console.log("Conectado ao SQL Server");
        return pool;
    } catch (error) {
        console.error('Erro ao conectar ao SQL Server:', error);
        throw error;
    }
}

async function main() {
    // Lista de IDs para exclusão
    const idsParaExcluir = [
        "183468",
        "183471",
        "183479",
        "183473",
        "183478",
        "183420",
        "183470",
        "183472",
        "183350",
        "183036",
        "182963",
        "177930",
        "183013",
        "182872",
        "182945",
        "177926",
        "183346",
        "177924",
        "182972",
        "182966",
        "177929",
        "177920",
        "182997",
        "183340",
        "178032",
        "182991",
        "183469",
        "177961",
        "177958",
        "182984",
        "183044",
        "181704",
        "181568",
        "181327",
        "183103",
        "177993",
        "178030",
        "183041",
        "183467",
        "177964",
        "183107",
        "182996",
        "177967",
        "183043",
        "177955",
        "181566",
        "181701",
        "181292",
        "181712",
        "181488",
        "181299",
        "183174",
        "177767",
        "182794",
        "183164",
        "177778",
        "183157",
        "177784",
        "177774",
        "183168",
        "182849",
        "182779",
        "182809",
        "183143",
        "177745",
        "182786",
        "182793",
        "177763",
        "177756",
        "177753",
        "182844",
        "182828",
        "183146",
        "183101",
        "183153",
        "182791",
        "182753",
        "177757",
        "183154",
        "177764",
        "183147",
        "182853",
        "177775",
        "183158",
        "182831",
        "177768",
        "183165",
        "177689",
        "182746",
        "177682",
        "183055",
        "183064",
        "177699",
        "182767",
        "177708",
        "183071",
        "183080",
        "177715",
        "177724",
        "182783",
        "182769",
        "177696",
        "182774",
        "182800",
        "183142",
        "183100",
        "177744",
        "177752",
        "177731",
        "182765",
        "182777",
        "183087",
        "183095",
        "177739",
        "177738",
        "182790",
        "183094",
        "177730",
        "183086",
        "182798",
        "177716",
        "177695",
        "182754",
        "182755",
        "177725",
        "183072",
        "183081",
        "177787",
        "177793",
        "183177",
        "182861",
        "183183",
        "182758",
        "183056",
        "177709",
        "177693",
        "177678",
        "183065",
        "177700",
        "182757",
        "182749",
        "181478",
        "181692",
        "181341",
        "182804",
        "177736",
        "183092",
        "183096",
        "183074",
        "177718",
        "177740",
        "182748",
        "182771",
        "177782",
        "182802",
        "182857",
        "183160",
        "177770",
        "183172",
        "183175",
        "182839",
        "177785",
        "182866",
        "183182",
        "177792",
        "182761",
        "177795",
        "182796",
        "177790",
        "183180",
        "183185",
        "183227",
        "177827",
        "182896",
        "182968",
        "183270",
        "177860",
        "182830",
        "182891",
        "177825",
        "177816",
        "183216",
        "177826",
        "182834",
        "183226",
        "183225",
        "183006",
        "177980",
        "178011",
        "182965",
        "183290",
        "183292",
        "183291",
        "183258",
        "177848",
        "177880",
        "177881",
        "177882",
        "183106",
        "178025",
        "182913",
        "182958",
        "182986",
        "182747",
        "177686",
        "177712",
        "183068",
        "181733",
        "181356",
        "181618",
        "177684",
        "183053",
        "177297",
        "177697",
        "182741",
        "181504",
        "181260",
        "181508",
        "181443",
        "181512",
        "181421",
        "181050",
        "181061",
        "181252",
        "181283",
        "181048",
        "181424",
        "181442",
        "181513",
        "181511",
        "181254",
        "196717",
        "181046",
        "181507",
        "181422",
        "181240",
        "195377",
        "183069",
        "182744",
        "177713",
        "177692",
        "182770",
        "177681",
        "183082",
        "177722",
        "183078",
        "177726",
        "177704",
        "182785",
        "182738",
        "183060",
        "177865",
        "182837",
        "177867",
        "182937",
        "177866",
        "183275",
        "183277",
        "183276",
        "183332",
        "183020",
        "177912",
        "181570",
        "181734",
        "181360",
        "184597",
        "177999",
        "183019",
        "183136",
        "178000",
        "183027",
        "178038",
        "183034",
        "183475",
        "181300",
        "181693",
        "181486",
        "181583",
        "181359",
        "181694",
        "182822",
        "177819",
        "183219",
        "177991",
        "183025",
        "177852",
        "183262",
        "182922",
        "177917",
        "183338",
        "177918",
        "182859",
        "183023",
        "177919",
        "182961",
        "183465",
        "178028",
        "183127",
        "177992",
        "183010",
        "178029",
        "183026",
        "183466",
        "183266",
        "182843",
        "177856",
        "177818",
        "182792",
        "183218",
        "182915",
        "183217",
        "177817",
        "178037",
        "183474",
        "183123",
        "183170",
        "182873",
        "182865",
        "177780",
        "177791",
        "177794",
        "183181",
        "183184",
        "182890",
        "183058",
        "177687",
        "177706",
        "177688",
        "177683",
        "182764",
        "182762",
        "182750",
        "183062",
        "177710",
        "177702",
        "183066",
        "181425",
        "181509",
        "181277",
        "181238",
        "181418",
        "181510",
        "182898",
        "182823",
        "177814",
        "183214",
        "183213",
        "177813",
        "183281",
        "182836",
        "177871",
        "183215",
        "177815",
        "182952",
        "183084",
        "177728",
        "182789",
        "177711",
        "183089",
        "183091",
        "177694",
        "177680",
        "177677",
        "182739",
        "182740",
        "183129",
        "182797",
        "183077",
        "183140",
        "177703",
        "183144",
        "178006",
        "182784",
        "177707",
        "183067",
        "183063",
        "182773",
        "183059",
        "177721",
        "182759",
        "182751",
        "177733",
        "177735",
        "177754",
        "182743",
        "177750",
        "183007",
        "177985",
        "183220",
        "182803",
        "177820",
        "181472",
        "181315",
        "181673",
        "182813",
        "177742",
        "183098",
        "183076",
        "177761",
        "182778",
        "182768",
        "182781",
        "183075",
        "183083",
        "182742",
        "182858",
        "183137",
        "177723",
        "177765",
        "177727",
        "177719",
        "177747",
        "183155",
        "177720",
        "183151",
        "182818",
        "183079",
        "182775",
        "182934",
        "178001",
        "183133",
        "178040",
        "183477",
        "181340",
        "181480",
        "181691",
        "181313",
        "181672",
        "177916",
        "181108",
        "177914",
        "181494",
        "182962",
        "183334",
        "182931",
        "182936",
        "177915",
        "181484",
        "181671",
        "181304",
        "181268",
        "181466",
        "181059",
        "181526",
        "181493",
        "181293",
        "181667",
        "181574",
        "181305",
        "181735",
        "177812",
        "183212",
        "182817",
        "195177",
        "181271",
        "181538",
        "181456",
        "181423",
        "181251",
        "181539",
        "181537",
        "181256",
        "181449",
        "181255",
        "181536",
        "181454",
        "181530",
        "181447",
        "181301",
        "181535",
        "181420",
        "181577",
        "181288",
        "181302",
        "181685",
        "181686",
        "181555",
        "181435",
        "181321",
        "181531",
        "181474",
        "181532",
        "181269",
        "181286",
        "181533",
        "181439",
        "181249",
        "181450",
        "181534",
        "181278",
        "181440",
        "181540",
        "183128",
        "178004",
        "181567",
        "181347",
        "181719",
        "181579",
        "181335",
        "181689",
        "181365",
        "181581",
        "181688",
        "181578",
        "181296",
        "181687",
        "181337",
        "181560",
        "181690",
        "181157",
        "181342",
        "181585",
        "181720",
        "183274",
        "182983",
        "182885",
        "183278",
        "182884",
        "177869",
        "183279",
        "183280",
        "177868",
        "177864",
        "177870",
        "182864",
        "181695",
        "183049",
        "181557",
        "181291",
        "178012",
        "183301",
        "177891",
        "183024",
        "178013",
        "177981",
        "183116",
        "181482",
        "181696",
        "181363",
        "182975",
        "182992",
        "181699",
        "181298",
        "181554",
        "177946",
        "182940",
        "183039",
        "181562",
        "181697",
        "181364",
        "181698",
        "181318",
        "181590",
        "181619",
        "181738",
        "181343",
        "181166",
        "181397",
        "181737",
        "181146",
        "181593",
        "181361",
        "181736",
        "181591",
        "181542",
        "181452",
        "181324",
        "181541",
        "181457",
        "183285",
        "182897",
        "177875",
        "183141",
        "182807",
        "182993",
        "183296",
        "183295",
        "182925",
        "177690",
        "177714",
        "183070",
        "177886",
        "177885",
        "177751",
        "182752",
        "182881",
        "177884",
        "183294",
        "183138",
        "177755",
        "177748",
        "182795",
        "182776",
        "183145",
        "177896",
        "183186",
        "177800",
        "183200",
        "182886",
        "177729",
        "183085",
        "182850",
        "182848",
        "182939",
        "183306",
        "183317",
        "183318",
        "182788",
        "182780",
        "177796",
        "177898",
        "177897",
        "182928",
        "177904",
        "183324",
        "177903",
        "183323",
        "183015",
        "183322",
        "177902",
        "183003",
        "177899",
        "182943",
        "177900",
        "177901",
        "183321",
        "183320",
        "177717",
        "183073",
        "182766",
        "181275",
        "181052",
        "181527",
        "181444",
        "183289",
        "182903",
        "177879",
        "182901",
        "177781",
        "177783",
        "177786",
        "183173",
        "183171",
        "183176",
        "182801",
        "181430",
        "181242",
        "181067",
        "181522",
        "183257",
        "183246",
        "183245",
        "182851",
        "182868",
        "177845",
        "182810",
        "182835",
        "182883",
        "177801",
        "182957",
        "183201",
        "183198",
        "177846",
        "177847",
        "177798",
        "177799",
        "183199",
        "182737",
        "177701",
        "183057",
        "177679",
        "177988",
        "183009",
        "183033",
        "178019",
        "183293",
        "182923",
        "177883",
        "182879",
        "183099",
        "177806",
        "177802",
        "182905",
        "177743",
        "183202",
        "183206",
        "182819",
        "195877",
        "177887",
        "183297",
        "182924",
        "178022",
        "183105",
        "177976",
        "183001",
        "177972",
        "182894",
        "177890",
        "177889",
        "182892",
        "182911",
        "183298",
        "183299",
        "182956",
        "177888",
        "183300",
        "181065",
        "181519",
        "181426",
        "181239",
        "183112",
        "178015",
        "177983",
        "183117",
        "181528",
        "181259",
        "181077",
        "181436",
        "177805",
        "181524",
        "181448",
        "177804",
        "177807",
        "182805",
        "177746",
        "183102",
        "183204",
        "183205",
        "181039",
        "183207",
        "182889",
        "182887",
        "177685",
        "182869",
        "182745",
        "181247",
        "183054",
        "177698",
        "181317",
        "181445",
        "181520",
        "183152",
        "182821",
        "177762",
        "177766",
        "182832",
        "177760",
        "182826",
        "183150",
        "183156",
        "195977",
        "183148",
        "177758",
        "182815",
        "181060",
        "181517",
        "181250",
        "181432",
        "177835",
        "177833",
        "182814",
        "177834",
        "182935",
        "182816",
        "183233",
        "183234",
        "183235",
        "182760",
        "177691",
        "177705",
        "183061",
        "183111",
        "177979",
        "178010",
        "183131",
        "181062",
        "181243",
        "181434",
        "181516",
        "183130",
        "178009",
        "181518",
        "181064",
        "181514",
        "181438",
        "181284",
        "181051",
        "181262",
        "181427",
        "178024",
        "183132",
        "181523",
        "181433",
        "181049",
        "181244",
        "183159",
        "183167",
        "183161",
        "177777",
        "182863",
        "177773",
        "182846",
        "182841",
        "182833",
        "183163",
        "177771",
        "177769",
        "181057",
        "181257",
        "181431",
        "181515",
        "181451",
        "181066",
        "181525",
        "181248",
        "182947",
        "178007",
        "196117",
        "177828",
        "183228",
        "182902",
        "182988",
        "183327",
        "177907",
        "177906",
        "182949",
        "183326",
        "177905",
        "183325",
        "183480",
        "178043",
        "183018",
        "183331",
        "177913",
        "182946",
        "182954",
        "183333",
        "183022",
        "177911",
        "183329",
        "177909",
        "183047",
        "182955",
        "177974",
        "177910",
        "177908",
        "183330",
        "178005",
        "183004",
        "178039",
        "183038",
        "183476",
        "181429",
        "181521",
        "181038",
        "181245",
        "183169",
        "177779",
        "182882",
        "182926",
        "177977",
        "182895",
        "177829",
        "183229",
        "182838",
        "183231",
        "183230",
        "182899",
        "177831",
        "177830",
        "181668",
        "181331",
        "181479",
        "181497",
        "181669",
        "181287",
        "181273",
        "181471",
        "181552",
        "181657",
        "181473",
        "181264",
        "181334",
        "181658",
        "181090",
        "181475",
        "181073",
        "183126",
        "178023",
        "183211",
        "182820",
        "183209",
        "182914",
        "177811",
        "177809",
        "183210",
        "182812",
        "177810",
        "178026",
        "182990",
        "177732",
        "182772",
        "183088",       
      ];
      
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "TRIBUTOS2024"
        const selectDatabaseQuery = 'USE TRIBUTOS2024';
        await masterConnection.query(selectDatabaseQuery);

        // Iterar sobre a lista de IDs e enviar uma solicitação de exclusão para cada um
        for (const id of idsParaExcluir) {
            const deletePayload = {
                idIntegracao: `${id}`,
                creditosTributarios: {
                    idGerado: {
                        id: id
                    }
                }
            };

            const response = await fetch('https://tributos.betha.cloud/service-layer-tributos/api/creditosTributarios/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                },
                body: JSON.stringify(deletePayload)
            });

            // Ler e mostrar a resposta da API
            const responseBody = await response.text();
            if (response.ok) {
                console.log(`Registro com ID ${id} excluído com sucesso. Resposta da API: ${responseBody}`);
            } else {
                console.error(`Erro ao excluir o registro com ID ${id}: ${response.statusText}`);
                console.error(`Detalhes do erro: ${responseBody}`);
            }
        }

    } catch (error) {
        // Lidar com erros de conexão ou consulta aqui
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        await sql.close();
    }
}

// Chamar a função principal
main();