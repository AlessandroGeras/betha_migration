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
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "FOLHA_CAM"
        const selectDatabaseQuery = 'USE FOLHA_FMAS';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL para obter os dados
        const userQuery = `
            select 
cd_FatorRisco as idIntegracao,
JSON_QUERY(
    (SELECT
case 
        WHEN cd_FatorRisco BETWEEN 101000 AND 101999 THEN 'FISICO'
        WHEN cd_FatorRisco BETWEEN 201000 AND 201999 THEN 'QUIMICO'
        ELSE 'OUTRO'
end as tipoFator,
CASE cd_FatorRisco 
WHEN 101000        THEN '0201001'
WHEN 101001        THEN '0201001'
WHEN 101002        THEN '0201001'
WHEN 101003        THEN '0201001'
WHEN 101004        THEN '0201006'
WHEN 101005        THEN '0201006'
WHEN 101006        THEN '0201006'
WHEN 101007        THEN '0201006'
WHEN 101008        THEN '0201006'
WHEN 101009        THEN '0201006'
WHEN 101010        THEN '0201006'
WHEN 101011        THEN '0201006'
WHEN 101012        THEN '0201006'
WHEN 101013        THEN '0201004'
WHEN 101014        THEN '0201004'
WHEN 101015        THEN '0201004'
WHEN 101016        THEN '0201004'
WHEN 101017        THEN '0201004'
WHEN 101018        THEN '0201004'
WHEN 101019        THEN '0201004'
WHEN 101999        THEN '0201004'
WHEN 201000        THEN '0118001'
WHEN 201001        THEN '0118001'
WHEN 201002        THEN '0118001'
WHEN 201003        THEN '0118001'
WHEN 201004        THEN '0118001'
WHEN 201005        THEN '0118001'
WHEN 201006        THEN '0118001'
WHEN 201007        THEN '0118001'
WHEN 201008        THEN '0118001'
WHEN 201009        THEN '0118001'
WHEN 201010        THEN '0118001'
WHEN 201011        THEN '0118001'
WHEN 201012        THEN '0118001'
WHEN 201013        THEN '0118001'
WHEN 201014        THEN '0118001'
WHEN 201015        THEN '0118001'
WHEN 201016        THEN '0118001'
WHEN 201017        THEN '0118001'
WHEN 201018        THEN '0118001'
WHEN 201019        THEN '0118001'
WHEN 201020        THEN '0118001'
WHEN 201021        THEN '0118001'
WHEN 201022        THEN '0118001'
WHEN 201023        THEN '0118001'
WHEN 201024        THEN '0118001'
WHEN 201025        THEN '0118001'
WHEN 201026        THEN '0118001'
WHEN 201027        THEN '0118001'
WHEN 201028        THEN '0118001'
WHEN 201029        THEN '0118001'
WHEN 201030        THEN '0118001'
WHEN 201031        THEN '0118001'
WHEN 201032        THEN '0118001'
WHEN 201033        THEN '0118001'
WHEN 201034        THEN '0118001'
WHEN 201035        THEN '0118001'
WHEN 201036        THEN '0118001'
WHEN 201037        THEN '0118001'
WHEN 201038        THEN '0118001'
WHEN 201039        THEN '0118001'
WHEN 201040        THEN '0118001'
WHEN 201041        THEN '0118001'
WHEN 201042        THEN '0118001'
WHEN 201043        THEN '0118001'
WHEN 201044        THEN '0118001'
WHEN 201045        THEN '0118001'
WHEN 201046        THEN '0118001'
WHEN 201047        THEN '0118001'
WHEN 201048        THEN '0118001'
WHEN 201049        THEN '0118001'
WHEN 201050        THEN '0118001'
WHEN 201051        THEN '0118001'
WHEN 201052        THEN '0118001'
WHEN 201053        THEN '0118001'
WHEN 201054        THEN '0119002'
WHEN 201055        THEN '0119002'
WHEN 201056        THEN '0119002'
WHEN 201057        THEN '0119002'
WHEN 201058        THEN '0119002'
WHEN 201059        THEN '0119002'
WHEN 201060        THEN '0119002'
WHEN 201061        THEN '0119002'
WHEN 201062        THEN '0119002'
WHEN 201063        THEN '0118001'
WHEN 201064        THEN '0118001'
WHEN 201065        THEN '0118001'
WHEN 201066        THEN '0118001'
WHEN 201067        THEN '0118001'
WHEN 201068        THEN '0118001'
WHEN 201069        THEN '0118001'
WHEN 201070        THEN '0118001'
WHEN 201071        THEN '0118001'
WHEN 201072        THEN '0118001'
WHEN 201073        THEN '0118001'
WHEN 201074        THEN '0118001'
WHEN 201075        THEN '0118001'
WHEN 201076        THEN '0118001'
WHEN 201077        THEN '0118001'
WHEN 201078        THEN '0118001'
WHEN 201079        THEN '0118001'
WHEN 201080        THEN '0118001'
WHEN 201081        THEN '0118001'
WHEN 201082        THEN '0118001'
WHEN 201083        THEN '0118001'
WHEN 201084        THEN '0118001'
WHEN 201085        THEN '0118001'
WHEN 201086        THEN '0118001'
WHEN 201087        THEN '0118001'
WHEN 201088        THEN '0118001'
WHEN 201089        THEN '0118001'
WHEN 201090        THEN '0118001'
WHEN 201091        THEN '0118001'
WHEN 201092        THEN '0118001'
WHEN 201093        THEN '0118001'
WHEN 201094        THEN '0118001'
WHEN 201095        THEN '0118001'
WHEN 201096        THEN '0118001'
WHEN 201097        THEN '0118001'
WHEN 201098        THEN '0118001'
WHEN 201099        THEN '0118001'
WHEN 201100        THEN '0118001'
WHEN 201101        THEN '0118001'
WHEN 201102        THEN '0118001'
WHEN 201103        THEN '0118001'
WHEN 201104        THEN '0118001'
WHEN 201105        THEN '0118001'
WHEN 201106        THEN '0118001'
WHEN 201107        THEN '0118001'
WHEN 201108        THEN '0118001'
WHEN 201109        THEN '0118001'
WHEN 201110        THEN '0118001'
WHEN 201111        THEN '0118001'
WHEN 201112        THEN '0118001'
WHEN 201113        THEN '0118001'
WHEN 201114        THEN '0118001'
WHEN 201115        THEN '0118001'
WHEN 201116        THEN '0118001'
WHEN 201117        THEN '0118001'
WHEN 201118        THEN '0118001'
WHEN 201119        THEN '0119018'
WHEN 201120        THEN '0119018'
WHEN 201121        THEN '0119018'
WHEN 201122        THEN '0119018'
WHEN 201123        THEN '0119018'
WHEN 201124        THEN '0119018'
WHEN 201125        THEN '0119018'
WHEN 201126        THEN '0119018'
WHEN 201127        THEN '0118001'
WHEN 201128        THEN '0118001'
WHEN 201129        THEN '0118001'
WHEN 201130        THEN '0118001'
WHEN 201131        THEN '0118001'
WHEN 201132        THEN '0118001'
WHEN 201133        THEN '0118001'
WHEN 201134        THEN '0118001'
WHEN 201135        THEN '0118001'
WHEN 201136        THEN '0118001'
WHEN 201137        THEN '0118001'
WHEN 201138        THEN '0118001'
WHEN 201139        THEN '0118001'
WHEN 201140        THEN '0118001'
WHEN 201141        THEN '0118001'
WHEN 201142        THEN '0118001'
WHEN 201143        THEN '0118001'
WHEN 201144        THEN '0118001'
WHEN 201145        THEN '0118001'
WHEN 201146        THEN '0118001'
WHEN 201147        THEN '0118001'
WHEN 201148        THEN '0118001'
WHEN 201149        THEN '0118001'
WHEN 201150        THEN '0118001'
WHEN 201151        THEN '0118001'
WHEN 201152        THEN '0118001'
WHEN 201153        THEN '0118001'
WHEN 201154        THEN '0118001'
WHEN 201155        THEN '0118001'
WHEN 201156        THEN '0118001'
WHEN 201157        THEN '0118001'
WHEN 201158        THEN '0118001'
WHEN 201159        THEN '0118001'
WHEN 201160        THEN '0118001'
WHEN 201161        THEN '0118001'
WHEN 201162        THEN '0118001'
WHEN 201163        THEN '0118001'
WHEN 201164        THEN '0118001'
WHEN 201165        THEN '0118001'
WHEN 201166        THEN '0118001'
WHEN 201167        THEN '0118001'
WHEN 201168        THEN '0118001'
WHEN 201169        THEN '0118001'
WHEN 201170        THEN '0118001'
WHEN 201171        THEN '0118001'
WHEN 201172        THEN '0118001'
WHEN 201173        THEN '0118001'
WHEN 201174        THEN '0118001'
WHEN 201175        THEN '0118001'
WHEN 201176        THEN '0118001'
WHEN 201177        THEN '0118001'
WHEN 201178        THEN '0118001'
WHEN 201179        THEN '0118001'
WHEN 201180        THEN '0108001'
WHEN 201181        THEN '0108001'
WHEN 201182        THEN '0108001'
WHEN 201183        THEN '0118001'
WHEN 201184        THEN '0118001'
WHEN 201185        THEN '0118001'
WHEN 201186        THEN '0118001'
WHEN 201187        THEN '0118001'
WHEN 201188        THEN '0118001'
WHEN 201189        THEN '0118001'
WHEN 201190        THEN '0118001'
WHEN 201191        THEN '0118001'
WHEN 201192        THEN '0119005'
WHEN 201193        THEN '0119005'
WHEN 201194        THEN '0119005'
WHEN 201195        THEN '0119005'
WHEN 201196        THEN '0119005'
WHEN 201197        THEN '0118001'
WHEN 201198        THEN '0118001'
WHEN 201199        THEN '0118001'
WHEN 201200        THEN '0118001'
WHEN 201201        THEN '0118001'
WHEN 201202        THEN '0118001'
WHEN 201203        THEN '0118001'
WHEN 201204        THEN '0118001'
WHEN 201205        THEN '0118001'
WHEN 201206        THEN '0118001'
WHEN 201207        THEN '0109001'
WHEN 201208        THEN '0109001'
WHEN 201209        THEN '0109001'
WHEN 201210        THEN '0109001'
WHEN 201211        THEN '0109001'
WHEN 201212        THEN '0109001'
WHEN 201213        THEN '0109001'
WHEN 201214        THEN '0109001'
WHEN 201215        THEN '0109001'
WHEN 201216        THEN '0109001'
WHEN 201217        THEN '0109001'
WHEN 201218        THEN '0109001'
WHEN 201219        THEN '0109001'
WHEN 201220        THEN '0109001'
WHEN 201221        THEN '0109001'
WHEN 201222        THEN '0109001'
WHEN 201223        THEN '0109001'
WHEN 201224        THEN '0109001'
WHEN 201225        THEN '0109001'
WHEN 201226        THEN '0109001'
WHEN 201227        THEN '0109001'
WHEN 201228        THEN '0109001'
WHEN 201229        THEN '0109001'
WHEN 201230        THEN '0109001'
WHEN 201231        THEN '0109001'
WHEN 201232        THEN '0109001'
WHEN 201233        THEN '0109001'
WHEN 201234        THEN '0109001'
WHEN 201235        THEN '0109001'
WHEN 201236        THEN '0109001'
WHEN 201237        THEN '0109001'
WHEN 201238        THEN '0109001'
WHEN 201239        THEN '0109001'
WHEN 201240        THEN '0109001'
WHEN 201241        THEN '0109001'
WHEN 201242        THEN '0109001'
WHEN 201243        THEN '0109001'
WHEN 201244        THEN '0109001'
WHEN 201245        THEN '0109001'
WHEN 201246        THEN '0109001'
WHEN 201247        THEN '0109001'
WHEN 201248        THEN '0109001'
WHEN 201249        THEN '0109001'
WHEN 201250        THEN '0109001'
WHEN 201251        THEN '0109001'
WHEN 201252        THEN '0109001'
WHEN 201253        THEN '0109001'
WHEN 201254        THEN '0110001'
WHEN 201255        THEN '0110001'
WHEN 201256        THEN '0110001'
WHEN 201257        THEN '0110001'
WHEN 201258        THEN '0110001'
WHEN 201259        THEN '0110001'
WHEN 201260        THEN '0110001'
WHEN 201261        THEN '0118001'
WHEN 201262        THEN '0118001'
WHEN 201263        THEN '0110001'
WHEN 201264        THEN '0110001'
WHEN 201265        THEN '0110001'
WHEN 201266        THEN '0110001'
WHEN 201267        THEN '0110001'
WHEN 201268        THEN '0110001'
WHEN 201269        THEN '0118001'
WHEN 201270        THEN '0118001'
WHEN 201271        THEN '0118001'
WHEN 201272        THEN '0118001'
WHEN 201273        THEN '0118001'
WHEN 201274        THEN '0118001'
WHEN 201275        THEN '0118001'
WHEN 201276        THEN '0118001'
WHEN 201277        THEN '0118001'
WHEN 201278        THEN '0118001'
WHEN 201279        THEN '0118001'
WHEN 201280        THEN '0118001'
WHEN 201281        THEN '0118001'
WHEN 201282        THEN '0118001'
WHEN 201283        THEN '0118001'
WHEN 201284        THEN '0118001'
WHEN 201285        THEN '0118001'
WHEN 201286        THEN '0118001'
WHEN 201287        THEN '0118001'
WHEN 201288        THEN '0118001'
WHEN 201289        THEN '0118001'
WHEN 201290        THEN '0118001'
WHEN 201291        THEN '0118001'
WHEN 201292        THEN '0118001'
WHEN 201293        THEN '0118001'
WHEN 201294        THEN '0118001'
WHEN 201295        THEN '0118001'
WHEN 201296        THEN '0118001'
WHEN 201297        THEN '0118001'
WHEN 201298        THEN '0118001'
WHEN 201299        THEN '0118001'
WHEN 201300        THEN '0118001'
WHEN 201301        THEN '0118001'
WHEN 201302        THEN '0118001'
WHEN 201303        THEN '0118001'
WHEN 201304        THEN '0118001'
WHEN 201305        THEN '0118001'
WHEN 201306        THEN '0118001'
WHEN 201307        THEN '0118001'
WHEN 201308        THEN '0118001'
WHEN 201309        THEN '0118001'
WHEN 201310        THEN '0118001'
WHEN 201311        THEN '0118001'
WHEN 201312        THEN '0118001'
WHEN 201313        THEN '0118001'
WHEN 201314        THEN '0118001'
WHEN 201315        THEN '0117001'
WHEN 201316        THEN '0118001'
WHEN 201317        THEN '0118001'
WHEN 201318        THEN '0118001'
WHEN 201319        THEN '0118001'
WHEN 201320        THEN '0118001'
WHEN 201321        THEN '0118001'
WHEN 201322        THEN '0118001'
WHEN 201323        THEN '0118001'
WHEN 201324        THEN '0118001'
WHEN 201325        THEN '0118001'
WHEN 201326        THEN '0118001'
WHEN 201327        THEN '0118001'
WHEN 201328        THEN '0118001'
WHEN 201329        THEN '0118001'
WHEN 201330        THEN '0118001'
WHEN 201331        THEN '0118001'
WHEN 201332        THEN '0118001'
WHEN 201333        THEN '0118001'
WHEN 201334        THEN '0118001'
WHEN 201335        THEN '0118001'
WHEN 201336        THEN '0118001'
WHEN 201337        THEN '0118001'
WHEN 201338        THEN '0118001'
WHEN 201339        THEN '0118001'
WHEN 201340        THEN '0118001'
WHEN 201341        THEN '0118001'
WHEN 201342        THEN '0118001'
WHEN 201343        THEN '0118001'
WHEN 201344        THEN '0118001'
WHEN 201345        THEN '0118001'
WHEN 201346        THEN '0118001'
WHEN 201347        THEN '0118001'
WHEN 201348        THEN '0118001'
WHEN 201349        THEN '0118001'
WHEN 201350        THEN '0118001'
WHEN 201351        THEN '0118001'
WHEN 201352        THEN '0118001'
WHEN 201353        THEN '0118001'
WHEN 201354        THEN '0118001'
WHEN 201355        THEN '0118001'
WHEN 201356        THEN '0118001'
WHEN 201357        THEN '0118001'
WHEN 201358        THEN '0118001'
WHEN 201359        THEN '0118001'
WHEN 201360        THEN '0118001'
WHEN 201361        THEN '0118001'
WHEN 201362        THEN '0111001'
WHEN 201363        THEN '0111001'
WHEN 201364        THEN '0111001'
WHEN 201365        THEN '0111001'
WHEN 201366        THEN '0111001'
WHEN 201367        THEN '0118001'
WHEN 201368        THEN '0118001'
WHEN 201369        THEN '0118001'
WHEN 201370        THEN '0118001'
WHEN 201371        THEN '0118001'
WHEN 201372        THEN '0118001'
WHEN 201373        THEN '0118001'
WHEN 201374        THEN '0118001'
WHEN 201375        THEN '0118001'
WHEN 201376        THEN '0118001'
WHEN 201377        THEN '0118001'
WHEN 201378        THEN '0118001'
WHEN 201379        THEN '0118001'
WHEN 201380        THEN '0118001'
WHEN 201381        THEN '0118001'
WHEN 201382        THEN '0118001'
WHEN 201383        THEN '0118001'
WHEN 201384        THEN '0118001'
WHEN 201385        THEN '0118001'
WHEN 201386        THEN '0109003'
WHEN 201387        THEN '0109003'
WHEN 201388        THEN '0109003'
WHEN 201389        THEN '0109003'
WHEN 201390        THEN '0109003'
WHEN 201391        THEN '0109003'
WHEN 201392        THEN '0109003'
WHEN 201393        THEN '0109003'
WHEN 201394        THEN '0109003'
WHEN 201395        THEN '0109003'
WHEN 201396        THEN '0109003'
WHEN 201397        THEN '0109003'
WHEN 201398        THEN '0109003'
WHEN 201399        THEN '0109003'
WHEN 201400        THEN '0109003'
WHEN 201401        THEN '0109003'
WHEN 201402        THEN '0109003'
WHEN 201403        THEN '0109003'
WHEN 201404        THEN '0109003'
WHEN 201405        THEN '0109003'
WHEN 201406        THEN '0109003'
WHEN 201407        THEN '0118001'
WHEN 201408        THEN '0118001'
WHEN 201409        THEN '0118001'
WHEN 201410        THEN '0118001'
WHEN 201411        THEN '0118001'
WHEN 201412        THEN '0118001'
WHEN 201413        THEN '0118001'
WHEN 201414        THEN '0118001'
WHEN 201415        THEN '0118001'
WHEN 201416        THEN '0118001'
WHEN 201417        THEN '0118001'
WHEN 201418        THEN '0118001'
WHEN 201419        THEN '0118001'
WHEN 201420        THEN '0118001'
WHEN 201421        THEN '0118001'
WHEN 201422        THEN '0118001'
WHEN 201423        THEN '0118001'
WHEN 201424        THEN '0118001'
WHEN 201425        THEN '0118001'
WHEN 201426        THEN '0118001'
WHEN 201427        THEN '0118001'
WHEN 201428        THEN '0118001'
WHEN 201429        THEN '0118001'
WHEN 201430        THEN '0119040'
WHEN 201431        THEN '0119040'
WHEN 201432        THEN '0119040'
WHEN 201433        THEN '0119040'
WHEN 201434        THEN '0118001'
WHEN 201435        THEN '0118001'
WHEN 201436        THEN '0118001'
WHEN 201437        THEN '0118001'
WHEN 201438        THEN '0118001'
WHEN 201439        THEN '0118001'
WHEN 201440        THEN '0118001'
WHEN 201441        THEN '0118001'
WHEN 201442        THEN '0118001'
WHEN 201443        THEN '0118001'
WHEN 201444        THEN '0118001'
WHEN 201445        THEN '0118001'
WHEN 201446        THEN '0118001'
WHEN 201447        THEN '0118001'
WHEN 201448        THEN '0118001'
WHEN 201449        THEN '0118001'
WHEN 201450        THEN '0118001'
WHEN 201451        THEN '0118001'
WHEN 201452        THEN '0118001'
WHEN 201453        THEN '0118001'
WHEN 201454        THEN '0118001'
WHEN 201455        THEN '0118001'
WHEN 201456        THEN '0118001'
WHEN 201457        THEN '0118001'
WHEN 201458        THEN '0118001'
WHEN 201459        THEN '0118001'
WHEN 201460        THEN '0118001'
WHEN 201461        THEN '0118001'
WHEN 201462        THEN '0118001'
WHEN 201463        THEN '0118001'
WHEN 201464        THEN '0118001'
WHEN 201465        THEN '0118001'
WHEN 201466        THEN '0118001'
WHEN 201467        THEN '0118001'
WHEN 201468        THEN '0118001'
WHEN 201469        THEN '0118001'
WHEN 201470        THEN '0118001'
WHEN 201471        THEN '0118001'
WHEN 201472        THEN '0118001'
WHEN 201473        THEN '0118001'
WHEN 201474        THEN '0118001'
WHEN 201475        THEN '0118001'
WHEN 201476        THEN '0118001'
WHEN 201477        THEN '0118001'
WHEN 201478        THEN '0118001'
WHEN 201479        THEN '0118001'
WHEN 201480        THEN '0118001'
WHEN 201481        THEN '0118001'
WHEN 201482        THEN '0118001'
WHEN 201483        THEN '0117001'
WHEN 201484        THEN '0117001'
WHEN 201485        THEN '0117001'
WHEN 201486        THEN '0117001'
WHEN 201487        THEN '0117001'
WHEN 201488        THEN '0117001'
WHEN 201489        THEN '0117001'
WHEN 201490        THEN '0117001'
WHEN 201491        THEN '0118001'
WHEN 201492        THEN '0118001'
WHEN 201493        THEN '0118001'
WHEN 201494        THEN '0117001'
WHEN 201495        THEN '0118001'
WHEN 201496        THEN '0118001'
WHEN 201497        THEN '0118001'
WHEN 201498        THEN '0118001'
WHEN 201499        THEN '0118001'
WHEN 201500        THEN '0118001'
WHEN 201501        THEN '0118001'
WHEN 201502        THEN '0118001'
WHEN 201503        THEN '0118001'
WHEN 201504        THEN '0118001'
WHEN 201505        THEN '0118001'
WHEN 201506        THEN '0118001'
WHEN 201507        THEN '0118001'
WHEN 201508        THEN '0118001'
WHEN 201509        THEN '0118001'
WHEN 201510        THEN '0118001'
WHEN 201511        THEN '0118001'
WHEN 201512        THEN '0118001'
WHEN 201513        THEN '0118001'
WHEN 201514        THEN '0118001'
WHEN 201515        THEN '0118001'
WHEN 201516        THEN '0118001'
WHEN 201517        THEN '0118001'
WHEN 201518        THEN '0118001'
WHEN 201519        THEN '0118001'
WHEN 201520        THEN '0118001'
WHEN 201521        THEN '0118001'
WHEN 201522        THEN '0118001'
WHEN 201523        THEN '0118001'
WHEN 201524        THEN '0118001'
WHEN 201525        THEN '0118001'
WHEN 201526        THEN '0118001'
WHEN 201527        THEN '0118001'
WHEN 201528        THEN '0118001'
WHEN 201529        THEN '0118001'
WHEN 201530        THEN '0118001'
WHEN 201531        THEN '0118001'
WHEN 201532        THEN '0118001'
WHEN 201533        THEN '0118001'
WHEN 201534        THEN '0118001'
WHEN 201535        THEN '0118001'
WHEN 201536        THEN '0118001'
WHEN 201537        THEN '0118001'
WHEN 201538        THEN '0118001'
WHEN 201539        THEN '0118001'
WHEN 201540        THEN '0118001'
WHEN 201541        THEN '0118001'
WHEN 201542        THEN '0118001'
WHEN 201543        THEN '0118001'
WHEN 201544        THEN '0118001'
WHEN 201545        THEN '0118001'
WHEN 201546        THEN '0118001'
WHEN 201547        THEN '0118001'
WHEN 201548        THEN '0118001'
WHEN 201549        THEN '0118001'
WHEN 201550        THEN '0118001'
WHEN 201551        THEN '0118001'
WHEN 201552        THEN '0118001'
WHEN 201553        THEN '0118001'
WHEN 201554        THEN '0118001'
WHEN 201555        THEN '0118001'
WHEN 201556        THEN '0118001'
WHEN 201557        THEN '0118001'
WHEN 201558        THEN '0118001'
WHEN 201559        THEN '0118001'
WHEN 201560        THEN '0118001'
WHEN 201561        THEN '0118001'
WHEN 201562        THEN '0118001'
WHEN 201563        THEN '0118001'
WHEN 201564        THEN '0118001'
WHEN 201565        THEN '0118001'
WHEN 201566        THEN '0118001'
WHEN 201567        THEN '0118001'
WHEN 201568        THEN '0118001'
WHEN 201569        THEN '0118001'
WHEN 201570        THEN '0118001'
WHEN 201571        THEN '0118001'
WHEN 201572        THEN '0118001'
WHEN 201573        THEN '0118001'
WHEN 201574        THEN '0118001'
WHEN 201575        THEN '0118001'
WHEN 201576        THEN '0118001'
WHEN 201577        THEN '0118001'
WHEN 201578        THEN '0118001'
WHEN 201579        THEN '0118001'
WHEN 201580        THEN '0118001'
WHEN 201581        THEN '0118001'
WHEN 201582        THEN '0118001'
WHEN 201583        THEN '0118001'
WHEN 201584        THEN '0118001'
WHEN 201585        THEN '0118001'
WHEN 201586        THEN '0118001'
WHEN 201587        THEN '0118001'
WHEN 201588        THEN '0118001'
WHEN 201589        THEN '0118001'
WHEN 201590        THEN '0118001'
WHEN 201591        THEN '0118001'
WHEN 201592        THEN '0118001'
WHEN 201593        THEN '0118001'
WHEN 201594        THEN '0118001'
WHEN 201595        THEN '0118001'
WHEN 201596        THEN '0118001'
WHEN 201597        THEN '0118001'
WHEN 201598        THEN '0118001'
WHEN 201599        THEN '0118001'
WHEN 201600        THEN '0118001'
WHEN 201601        THEN '0118001'
WHEN 201602        THEN '0118001'
WHEN 201603        THEN '0118001'
WHEN 201604        THEN '0118001'
WHEN 201605        THEN '0118001'
WHEN 201606        THEN '0118001'
WHEN 201607        THEN '0118001'
WHEN 201608        THEN '0118001'
WHEN 201609        THEN '0118001'
WHEN 201610        THEN '0118001'
WHEN 201611        THEN '0118001'
WHEN 201612        THEN '0118001'
WHEN 201613        THEN '0118001'
WHEN 201614        THEN '0118001'
WHEN 201615        THEN '0118001'
WHEN 201616        THEN '0118001'
WHEN 201617        THEN '0118001'
WHEN 201618        THEN '0118001'
WHEN 201619        THEN '0118001'
WHEN 201620        THEN '0118001'
WHEN 201621        THEN '0118001'
WHEN 201622        THEN '0118001'
WHEN 201623        THEN '0118001'
WHEN 201624        THEN '0118001'
WHEN 201625        THEN '0118001'
WHEN 201626        THEN '0118001'
WHEN 201627        THEN '0118001'
WHEN 201628        THEN '0118001'
WHEN 201629        THEN '0118001'
WHEN 201630        THEN '0118001'
WHEN 201631        THEN '0118001'
WHEN 201632        THEN '0118001'
WHEN 201633        THEN '0118001'
WHEN 201634        THEN '0118001'
WHEN 201635        THEN '0118001'
WHEN 201636        THEN '0118001'
WHEN 201637        THEN '0118001'
WHEN 201638        THEN '0118001'
WHEN 201639        THEN '0118001'
WHEN 201640        THEN '0118001'
WHEN 201641        THEN '0118001'
WHEN 201642        THEN '0118001'
WHEN 201643        THEN '0118001'
WHEN 201644        THEN '0118001'
WHEN 201645        THEN '0118001'
WHEN 201646        THEN '0118001'
WHEN 201647        THEN '0118001'
WHEN 201648        THEN '0118001'
WHEN 201649        THEN '0118001'
WHEN 201650        THEN '0118001'
WHEN 201651        THEN '0118001'
WHEN 201652        THEN '0118001'
WHEN 201653        THEN '0118001'
WHEN 201654        THEN '0118001'
WHEN 201655        THEN '0118001'
WHEN 201656        THEN '0118001'
WHEN 201657        THEN '0118001'
WHEN 201658        THEN '0118001'
WHEN 201659        THEN '0118001'
WHEN 201660        THEN '0118001'
WHEN 201661        THEN '0118001'
WHEN 201662        THEN '0118001'
WHEN 201663        THEN '0118001'
WHEN 201664        THEN '0118001'
WHEN 201665        THEN '0118001'
WHEN 201666        THEN '0118001'
WHEN 201667        THEN '0118001'
WHEN 201668        THEN '0118001'
WHEN 201669        THEN '0118001'
WHEN 201670        THEN '0118001'
WHEN 201671        THEN '0118001'
WHEN 201672        THEN '0118001'
WHEN 201673        THEN '0118001'
WHEN 201674        THEN '0118001'
WHEN 201675        THEN '0118001'
WHEN 201676        THEN '0118001'
WHEN 201677        THEN '0118001'
WHEN 201678        THEN '0118001'
WHEN 201679        THEN '0118001'
WHEN 201680        THEN '0118001'
WHEN 201681        THEN '0118001'
WHEN 201682        THEN '0118001'
WHEN 201683        THEN '0118001'
WHEN 201684        THEN '0118001'
WHEN 201685        THEN '0118001'
WHEN 201686        THEN '0118001'
WHEN 201687        THEN '0118001'
WHEN 201688        THEN '0118001'
WHEN 201689        THEN '0118001'
WHEN 201690        THEN '0118001'
WHEN 201691        THEN '0118001'
WHEN 201692        THEN '0118001'
WHEN 201693        THEN '0118001'
WHEN 201694        THEN '0118001'
WHEN 201695        THEN '0118001'
WHEN 201696        THEN '0118001'
WHEN 201697        THEN '0118001'
WHEN 201698        THEN '0118001'
WHEN 201699        THEN '0118001'
WHEN 201700        THEN '0118001'
WHEN 201701        THEN '0118001'
WHEN 201702        THEN '0118001'
WHEN 201703        THEN '0118001'
WHEN 201704        THEN '0118001'
WHEN 201705        THEN '0118001'
WHEN 201706        THEN '0118001'
WHEN 201707        THEN '0119033'
WHEN 201708        THEN '0119033'
WHEN 201709        THEN '0119033'
WHEN 201710        THEN '0119033'
WHEN 201711        THEN '0119033'
WHEN 201712        THEN '0119033'
WHEN 201713        THEN '0119033'
WHEN 201714        THEN '0119033'
WHEN 201715        THEN '0119033'
WHEN 201716        THEN '0118001'
WHEN 201717        THEN '0118001'
WHEN 201718        THEN '0118001'
WHEN 201719        THEN '0118001'
WHEN 201720        THEN '0118001'
WHEN 201721        THEN '0118001'
WHEN 201722        THEN '0118001'
WHEN 201723        THEN '0118001'
WHEN 201724        THEN '0118001'
WHEN 201725        THEN '0118001'
WHEN 201726        THEN '0118001'
WHEN 201727        THEN '0118001'
WHEN 201728        THEN '0118001'
WHEN 201729        THEN '0118001'
WHEN 201730        THEN '0118001'
WHEN 201731        THEN '0118001'
WHEN 201732        THEN '0118001'
WHEN 201733        THEN '0118001'
WHEN 201734        THEN '0118001'
WHEN 201735        THEN '0118001'
WHEN 201736        THEN '0118001'
WHEN 201737        THEN '0118001'
WHEN 201738        THEN '0118001'
WHEN 201739        THEN '0118001'
WHEN 201740        THEN '0118001'
WHEN 201741        THEN '0118001'
WHEN 201742        THEN '0118001'
WHEN 201743        THEN '0118001'
WHEN 201744        THEN '0118001'
WHEN 201745        THEN '0118001'
WHEN 201746        THEN '0119022'
WHEN 201747        THEN '0119022'
WHEN 201748        THEN '0119022'
WHEN 201749        THEN '0119022'
WHEN 201750        THEN '0119022'
WHEN 201751        THEN '0119022'
WHEN 201752        THEN '0119022'
WHEN 201753        THEN '0119022'
WHEN 201754        THEN '0119022'
WHEN 201755        THEN '0119022'
WHEN 201756        THEN '0119022'
WHEN 201757        THEN '0118001'
WHEN 201758        THEN '0118001'
WHEN 201759        THEN '0118001'
WHEN 201760        THEN '0118001'
WHEN 201761        THEN '0118001'
WHEN 201762        THEN '0118001'
WHEN 201763        THEN '0118001'
WHEN 201764        THEN '0118001'
WHEN 201765        THEN '0118001'
WHEN 201766        THEN '0118001'
WHEN 201767        THEN '0118001'
WHEN 201768        THEN '0118001'
WHEN 201769        THEN '0118001'
WHEN 201770        THEN '0118001'
WHEN 201771        THEN '0118001'
WHEN 201772        THEN '0118001'
WHEN 201773        THEN '0118001'
WHEN 201774        THEN '0118001'
WHEN 201775        THEN '0118001'
WHEN 201776        THEN '0118001'
WHEN 201777        THEN '0118001'
WHEN 201778        THEN '0118001'
WHEN 201779        THEN '0118001'
WHEN 201780        THEN '0118001'
WHEN 201781        THEN '0118001'
WHEN 201782        THEN '0118001'
WHEN 201783        THEN '0118001'
WHEN 201784        THEN '0118001'
WHEN 201785        THEN '0118001'
WHEN 201786        THEN '0118001'
WHEN 201787        THEN '0118001'
WHEN 201788        THEN '0118001'
WHEN 201789        THEN '0118001'
WHEN 201790        THEN '0118001'
WHEN 201791        THEN '0118001'
WHEN 201792        THEN '0118001'
WHEN 201793        THEN '0118001'
WHEN 201794        THEN '0118001'
WHEN 201795        THEN '0118001'
WHEN 201796        THEN '0118001'
WHEN 201797        THEN '0118001'
WHEN 201798        THEN '0118001'
WHEN 201799        THEN '0118001'
WHEN 201800        THEN '0118001'
WHEN 201801        THEN '0118001'
WHEN 201802        THEN '0118001'
WHEN 201803        THEN '0118001'
WHEN 201804        THEN '0118001'
WHEN 201805        THEN '0118001'
WHEN 201806        THEN '0118001'
WHEN 201807        THEN '0118001'
WHEN 201808        THEN '0118001'
WHEN 201809        THEN '0118001'
WHEN 201810        THEN '0118001'
WHEN 201811        THEN '0118001'
WHEN 201812        THEN '0118001'
WHEN 201813        THEN '0118001'
WHEN 201814        THEN '0118001'
WHEN 201815        THEN '0118001'
WHEN 201816        THEN '0118001'
WHEN 201817        THEN '0118001'
WHEN 201818        THEN '0118001'
WHEN 201819        THEN '0118001'
WHEN 201820        THEN '0118001'
WHEN 201821        THEN '0118001'
WHEN 201822        THEN '0118001'
WHEN 201823        THEN '0118001'
WHEN 201824        THEN '0118001'
WHEN 201825        THEN '0118001'
WHEN 201826        THEN '0118001'
WHEN 201827        THEN '0118001'
WHEN 201828        THEN '0118001'
WHEN 201829        THEN '0118001'
WHEN 201830        THEN '0118001'
WHEN 201831        THEN '0118001'
WHEN 201832        THEN '0118001'
WHEN 201833        THEN '0118001'
WHEN 201834        THEN '0118001'
WHEN 201835        THEN '0118001'
WHEN 201836        THEN '0118001'
WHEN 201837        THEN '0118001'
WHEN 201838        THEN '0118001'
WHEN 201839        THEN '0118001'
WHEN 201840        THEN '0118001'
WHEN 201841        THEN '0118001'
WHEN 201999        THEN '0118001'
WHEN 301000        THEN '0301001'
WHEN 301001        THEN '0301001'
WHEN 301002        THEN '0301004'
WHEN 301003        THEN '0301005'
WHEN 301004        THEN '0301007'
WHEN 301006        THEN '0301001'
WHEN 301007        THEN '0301001'
WHEN 301008        THEN '0301001'
WHEN 301009        THEN '0301001'
WHEN 301010        THEN '0301001'
WHEN 301011        THEN '0301001'
WHEN 301012        THEN '0301001'
WHEN 301013        THEN '0301004'
WHEN 301014        THEN '0301006'
WHEN 400000        THEN '0501001'
WHEN 401000        THEN '0501001'
WHEN 401001        THEN '0501001'
WHEN 401002        THEN '0501001'
WHEN 401003        THEN '0501001'
WHEN 401004        THEN '0501001'
WHEN 401005        THEN '0501001'
WHEN 401006        THEN '0501001'
WHEN 401007        THEN '0501001'
WHEN 401008        THEN '0501001'
WHEN 401009        THEN '0501001'
WHEN 401999        THEN '0501001'
WHEN 402000        THEN '0501001'
WHEN 402001        THEN '0501001'
WHEN 402002        THEN '0501001'
WHEN 402999        THEN '0501001'
WHEN 403000        THEN '0501001'
WHEN 403001        THEN '0501001'
WHEN 403002        THEN '0501001'
WHEN 403003        THEN '0501001'
WHEN 403004        THEN '0501001'
WHEN 403005        THEN '0501001'
WHEN 403006        THEN '0501001'
WHEN 403999        THEN '0501001'
WHEN 404000        THEN '0501001'
WHEN 404001        THEN '0501001'
WHEN 404002        THEN '0501001'
WHEN 404003        THEN '0501001'
WHEN 404004        THEN '0501001'
WHEN 404999        THEN '0501001'
WHEN 501000        THEN '0501001'
WHEN 501001        THEN '0501001'
WHEN 501002        THEN '0501001'
WHEN 501003        THEN '0501001'
WHEN 501004        THEN '0501001'
WHEN 501005        THEN '0501001'
WHEN 501006        THEN '0501001'
WHEN 501007        THEN '0501001'
WHEN 501008        THEN '0501001'
WHEN 501009        THEN '0501001'
WHEN 501010        THEN '0501001'
WHEN 501011        THEN '0501001'
WHEN 501012        THEN '0501001'
WHEN 501013        THEN '0501001'
WHEN 501014        THEN '0501001'
WHEN 501015        THEN '0501001'
WHEN 501016        THEN '0501001'
WHEN 501017        THEN '0501001'
WHEN 501999        THEN '0501001'
WHEN 601000        THEN '0501001'
WHEN 601001        THEN '0501001'
WHEN 601002        THEN '0501001'
WHEN 601003        THEN '0501001'
WHEN 601004        THEN '0501001'
WHEN 601005        THEN '0501001'
WHEN 601006        THEN '0501001'
WHEN 601999        THEN '0501001'
WHEN 701000        THEN '0501001'
WHEN 701001        THEN '0501001'
WHEN 701002        THEN '0501001'
WHEN 701003        THEN '0501001'
WHEN 701999        THEN '0501001'
WHEN 801000        THEN '0501001'
WHEN 801001        THEN '0501001'
WHEN 801002        THEN '0501001'
WHEN 801999        THEN '0501001'
WHEN 901000        THEN '0501001'
WHEN 901001        THEN '0501001'
END as codigoFatorRisco,
'QUANTITATIVO' as tipoAvaliacaoRisco,
'HORA' as unidade,
ds_FatorRisco as observacao,
JSON_QUERY(
    (SELECT
   99377 as id
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS lotacaoFisica
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS conteudo
from FOLHESFatorRisco
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const conteudo = JSON.parse(record.conteudo); // Parse the JSON string to an object

            return {
                idIntegracao: record.idIntegracao.toString(),
                conteudo: {
                    tipoFator: conteudo.tipoFator,
                    codigoFatorRisco: conteudo.codigoFatorRisco,
                    tipoAvaliacaoRisco: conteudo.tipoAvaliacaoRisco,
                    unidade: conteudo.unidade,
                    observacao: conteudo.observacao,
                    lotacaoFisica: {
                        id: conteudo.lotacaoFisica.id // Assumindo que o resultado de lotacaoFisica é um array com um único objeto
                    }
                }
            };
        });

        const chunkSize = 300;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
        /* for (const record of transformedData) {
            const response = await fetch('https://pessoal.betha.cloud/service-layer/v1/api/risco-ambiental', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
                    },
                    body: JSON.stringify(record)
                });
    
                if (response.ok) {
                    console.log(`Dados do registro enviados com sucesso para a rota.`);
                } else {
                    console.error(`Erro ao enviar os dados do registro para a rota:`, response.statusText);
                }
            } */
    
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
    