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

        // Selecionar o banco de dados "COMP_ALMO"
        const selectDatabaseQuery = 'USE PATRIMONIO';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            SELECT
ROW_NUMBER() OVER (ORDER BY BP.cd_Cecam) as id,
JSON_QUERY((SELECT 86851 as id  FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS depreciacao,-- /id da depreciação dependendo da data q to enviando ta la na betha/
JSON_QUERY((SELECT 
case bp.nr_chapa
when        4800        then        16357078
when        4801        then        16357065
when        4802        then        16357083
when        4803        then        16357064
when        4804        then        16357081
when        4805        then        16357058
when        4808        then        16483305
when        4809        then        16356962
when        4810        then        16356973
when        4811        then        16357039
when        4812        then        16356991
when        4813        then        16357045
when        4814        then        16357149
when        4815        then        16357095
when        4816        then        16357055
when        4817        then        16358759
when        4818        then        16358725
when        4820        then        16358764
when        4821        then        16358778
when        4822        then        16358777
when        4823        then        16358776
when        4824        then        16358779
when        4825        then        16357075
when        4919        then        16483328
when        4945        then        16359450
when        4946        then        16359453
when        4947        then        16359476
when        4968        then        16359555
when        4969        then        16359560
when        4973        then        16359573
when        4974        then        16359544
when        4975        then        16359543
when        4976        then        16359592
when        4977        then        16359554
when        4978        then        16359549
when        4979        then        16359568
when        4981        then        16359514
when        4990        then        16483353
when        4991        then        16483345
when        4992        then        16483378
when        4993        then        16356969
when        4995        then        16359566
when        5012        then        16483343
when        5073        then        16483331
when        5074        then        16483335
when        5076        then        16483338
when        5122        then        16359577
when        5123        then        16359570
when        5124        then        16359559
when        5125        then        16359564
when        5126        then        16359574
when        5127        then        16359562
when        5128        then        16359575
when        5129        then        16359578
when        5130        then        16359589
when        5131        then        16359546
when        5132        then        16359550
when        5133        then        16359576
when        5134        then        16359542
when        5135        then        16359467
when        5136        then        16359462
when        5137        then        16359581
when        5138        then        16359569
when        5139        then        16359548
when        5142        then        16483381
when        5143        then        16483382
when        5144        then        16483371
when        5145        then        16483363
when        5149        then        16480319
when        5150        then        16359638
when        5151        then        16359591
when        5152        then        16359600
when        5153        then        16359624
when        5154        then        16359617
when        5158        then        16359609
when        5159        then        16359593
when        5160        then        16359607
when        5164        then        16359611
when        5165        then        16359614
when        5166        then        16359639
when        5167        then        16359629
when        5168        then        16359625
when        5175        then        16359552
when        5176        then        16359587
when        5177        then        16359517
when        5178        then        16359558
when        5179        then        16359567
when        5180        then        16359572
when        5181        then        16359563
when        5182        then        16359590
when        5183        then        16359580
when        5184        then        16359586
when        5216        then        16484993
when        5220        then        16483295
when        5227        then        16483344
when        5228        then        16483380
when        5229        then        16483360
when        5230        then        16483354
when        5231        then        16483367
when        5232        then        16483375
when        5236        then        16359588
when        5237        then        16359595
when        5238        then        16359667
when        5239        then        16484994
when        5240        then        16483342
when        5241        then        16359719
when        5242        then        16359693
when        5243        then        16359722
when        5244        then        16359725
when        5259        then        16483356
when        5860        then        16359741
when        5861        then        16359505
when        5862        then        16483308
when        5877        then        16359736
when        5886        then        16359680
when        5887        then        16359684
when        5888        then        16359688
when        5889        then        16359672
when        5890        then        16359642
when        5891        then        16359646
when        5892        then        16359658
when        5893        then        16359677
when        5894        then        16359709
when        5895        then        16359706
when        5896        then        16359715
when        5897        then        16359723
when        5898        then        16359661
when        5899        then        16359664
when        5900        then        16359643
when        5901        then        16359681
when        5902        then        16359670
when        5903        then        16359649
when        5904        then        16359690
when        5905        then        16359671
when        5906        then        16359654
when        5907        then        16359655
when        5908        then        16359648
when        5909        then        16359691
when        5910        then        16359663
when        5911        then        16359650
when        5912        then        16359657
when        5913        then        16359682
when        5914        then        16359665
when        5915        then        16359662
when        5916        then        16359678
when        5917        then        16359669
when        5918        then        16359659
when        5919        then        16359645
when        5920        then        16359676
when        5921        then        16359673
when        5922        then        16359656
when        5923        then        16359675
when        5924        then        16359692
when        5925        then        16359679
when        5926        then        16359651
when        5927        then        16359644
when        5928        then        16359647
when        5929        then        16359666
when        5930        then        16359660
when        5931        then        16359695
when        5932        then        16359668
when        5933        then        16359652
when        5934        then        16359653
when        5935        then        16359674
when        5936        then        16359685
when        5937        then        16359547
when        5938        then        16359571
when        5939        then        16359556
when        5940        then        16359565
when        5941        then        16480317
when        5942        then        16359585
when        5943        then        16359553
when        5944        then        16359557
when        5945        then        16359583
when        5946        then        16359584
when        5947        then        16359551
when        5948        then        16359579
when        5949        then        16359582
when        5950        then        16359561
when        6005        then        16359724
when        6006        then        16359739
when        6007        then        16359704
when        6008        then        16359718
when        6009        then        16359712
when        6013        then        16359759
when        6014        then        16359707
when        6015        then        16359768
when        6016        then        16359782
when        6017        then        16359771
when        6018        then        16359787
when        6019        then        16359749
when        6020        then        16359786
when        6021        then        16359777
when        6022        then        16359761
when        6023        then        16359746
when        6024        then        16359773
when        6025        then        16359754
when        6027        then        16359776
when        6028        then        16483296
when        6029        then        16359604
when        6030        then        16359601
when        6031        then        16359594
when        6032        then        16359616
when        6033        then        16483326
when        6034        then        16359717
when        6035        then        16359694
when        6036        then        16359716
when        6037        then        16359721
when        6038        then        16359738
when        6039        then        16359735
when        6040        then        16359710
when        6041        then        16359729
when        6042        then        16359711
when        6043        then        16359708
when        6044        then        16359726
when        6045        then        16359702
when        6046        then        16359701
when        6047        then        16359705
when        6048        then        16359697
when        6049        then        16359714
when        6050        then        16359731
when        6051        then        16359727
when        6052        then        16359732
when        6053        then        16359700
when        6054        then        16359734
when        6055        then        16359730
when        6056        then        16359698
when        6057        then        16359689
when        6071        then        16483300
when        6072        then        16483307
when        6073        then        16485131
when        6075        then        16359686
when        6076        then        16359728
when        6078        then        16483311
when        6083        then        16483359
when        6084        then        16480300
when        6085        then        16480313
when        6086        then        16480301
when        6087        then        16359703
when        6088        then        16359683
when        6089        then        16359322
when        6090        then        16359742
when        6091        then        16359713
when        6092        then        16359623
when        6093        then        16359641
when        6094        then        16359608
when        6095        then        16359637
when        6096        then        16359628
when        6097        then        16359603
when        6098        then        16359634
when        6099        then        16359622
when        6100        then        16359620
when        6101        then        16359613
when        6102        then        16359602
when        6103        then        16359631
when        6104        then        16359605
when        6105        then        16359636
when        6106        then        16359627
when        6107        then        16359630
when        6108        then        16359632
when        6109        then        16359597
when        6110        then        16359612
when        6111        then        16359615
when        6112        then        16359619
when        6113        then        16359633
when        6121        then        16483372
when        6122        then        16483366
when        6123        then        16483373
when        6124        then        16483352
when        6170        then        16483350
when        6171        then        16359783
when        6172        then        16359774
when        6173        then        16359756
when        6174        then        16359765
when        6175        then        16359769
when        6176        then        16359757
when        6177        then        16359805
when        6178        then        16359795
when        6179        then        16359811
when        6180        then        16359822
when        6181        then        16359816
when        6182        then        16359835
when        6183        then        16359802
when        6184        then        16359798
when        6185        then        16359831
when        6186        then        16359819
when        6187        then        16359818
when        6188        then        16359824
when        6189        then        16359825
when        6190        then        16359800
when        6191        then        16359804
when        6192        then        16359803
when        6193        then        16359790
when        6194        then        16359837
when        6195        then        16359820
when        6196        then        16359829
when        6197        then        16359794
when        6198        then        16359843
when        6199        then        16359828
when        6200        then        16359789
when        6201        then        16359813
when        6202        then        16359796
when        6203        then        16359836
when        6204        then        16359823
when        6205        then        16359834
when        6206        then        16359808
when        6207        then        16359767
when        6208        then        16359778
when        6209        then        16359779
when        6210        then        16359793
when        6211        then        16359842
when        6212        then        16359832
when        6213        then        16359784
when        6214        then        16359792
when        6215        then        16359755
when        6216        then        16359791
when        6217        then        16359785
when        6218        then        16359743
when        6219        then        16359762
when        6220        then        16359758
when        6221        then        16359775
when        6222        then        16359751
when        6223        then        16359780
when        6224        then        16359781
when        6225        then        16359770
when        6226        then        16359760
when        6227        then        16359766
when        6228        then        16359763
when        6229        then        16359753
when        6230        then        16359744
when        6231        then        16359764
when        6232        then        16359748
when        6233        then        16359750
when        6234        then        16359752
when        6235        then        16359747
when        6236        then        16359745
when        6237        then        16359772
when        6238        then        16359740
when        6239        then        16359788
when        6240        then        16359635
when        6241        then        16359596
when        6242        then        16359826
when        6243        then        16359809
when        6244        then        16359812
when        6245        then        16359833
when        6246        then        16359821
when        6247        then        16359815
when        6248        then        16359830
when        6249        then        16359807
when        6250        then        16359872
when        6251        then        16359887
when        6252        then        16359879
when        6253        then        16359870
when        6254        then        16359860
when        6255        then        16359864
when        6256        then        16359863
when        6257        then        16359876
when        6258        then        16359855
when        6259        then        16359889
when        6260        then        16359858
when        6261        then        16359854
when        6262        then        16359814
when        6263        then        16359817
when        6264        then        16359827
when        6265        then        16359839
when        6266        then        16359873
when        6267        then        16359841
when        6268        then        16359810
when        6269        then        16359801
when        6270        then        16359838
when        6271        then        16359797
when        6272        then        16359799
when        6273        then        16359806
when        6287        then        16359733
when        6288        then        16359699
when        6289        then        16483309
when        6299        then        16359618
when        6300        then        16359621
when        6301        then        16359640
when        6303        then        16483346
when        6304        then        16357049
when        6305        then        16483332
when        6307        then        16483364
when        6308        then        16483349
when        6309        then        16359845
when        6310        then        16359874
when        6313        then        16359886
when        6314        then        16483368
when        6315        then        16359598
when        6316        then        16359610
when        6317        then        16359599
when        6319        then        16359844
when        6320        then        16357054
when        6322        then        16483340
when        6323        then        16483294
when        6328        then        16483376
when        6329        then        16483298
when        6330        then        16359875
when        6331        then        16359867
when        6332        then        16359846
when        6333        then        16359851
when        6334        then        16359883
when        6335        then        16359849
when        6336        then        16359894
when        6337        then        16359916
when        6338        then        16359897
when        6339        then        16359907
when        6340        then        16359899
when        6341        then        16359917
when        6342        then        16359912
when        6343        then        16359930
when        6344        then        16359891
when        6345        then        16359932
when        6346        then        16359906
when        6347        then        16359904
when        6348        then        16359923
when        6349        then        16359920
when        6350        then        16359909
when        6351        then        16359929
when        6352        then        16359896
when        6353        then        16359931
when        6354        then        16359856
when        6355        then        16359865
when        6356        then        16359892
when        6357        then        16359888
when        6358        then        16359857
when        6359        then        16359878
when        6360        then        16359877
when        6361        then        16359868
when        6362        then        16359853
when        6363        then        16359847
when        6364        then        16359885
when        6365        then        16359862
when        6366        then        16359880
when        6367        then        16359884
when        6368        then        16359848
when        6369        then        16359852
when        6370        then        16359882
when        6371        then        16359861
when        6372        then        16359866
when        6373        then        16359893
when        6374        then        16359840
when        6375        then        16359869
when        6376        then        16359859
when        6377        then        16359850
when        6378        then        16359881
when        6379        then        16359871
when        6380        then        16359480
when        6381        then        16359454
when        6382        then        16359455
when        6383        then        16359449
when        6384        then        16359481
when        6385        then        16359475
when        6386        then        16359513
when        6387        then        16359534
when        6388        then        16359507
when        6389        then        16359522
when        6390        then        16359525
when        6391        then        16359499
when        6392        then        16359497
when        6393        then        16359532
when        6394        then        16359516
when        6395        then        16359528
when        6396        then        16359509
when        6397        then        16359533
when        6398        then        16359518
when        6399        then        16359526
when        6400        then        16359519
when        6401        then        16359502
when        6402        then        16359538
when        6403        then        16359527
when        6404        then        16359498
when        6405        then        16359504
when        6406        then        16359540
when        6407        then        16359508
when        6408        then        16359541
when        6409        then        16359506
when        6410        then        16359524
when        6411        then        16359529
when        6412        then        16359535
when        6413        then        16359520
when        6414        then        16359531
when        6415        then        16359537
when        6416        then        16359536
when        6417        then        16359523
when        6418        then        16359495
when        6419        then        16359515
when        6420        then        16359545
when        6421        then        16359490
when        6422        then        16359521
when        6423        then        16359530
when        6424        then        16359539
when        6425        then        16359500
when        6426        then        16359511
when        6427        then        16359501
when        6428        then        16359463
when        6429        then        16359510
when        6430        then        16359492
when        6431        then        16359489
when        6432        then        16359503
when        6433        then        16359512
when        6434        then        16359486
when        6435        then        16359469
when        6436        then        16359471
when        6437        then        16359477
when        6438        then        16359466
when        6439        then        16359461
when        6440        then        16359446
when        6441        then        16359456
when        6442        then        16359452
when        6443        then        16359485
when        6444        then        16359441
when        6445        then        16359465
when        6446        then        16359448
when        6447        then        16359482
when        6448        then        16359479
when        6449        then        16359484
when        6450        then        16359451
when        6451        then        16359478
when        6452        then        16359459
when        6453        then        16359483
when        6454        then        16359468
when        6455        then        16359464
when        6456        then        16359470
when        6457        then        16359496
when        6458        then        16359460
when        6459        then        16359493
when        6460        then        16359473
when        6461        then        16359443
when        6462        then        16359474
when        6463        then        16359488
when        6464        then        16483347
when        6465        then        16483379
when        6466        then        16483377
when        6467        then        16483362
when        6468        then        16483358
when        6471        then        16485132
when        6472        then        16483321
when        6473        then        16483310
when        6474        then        16483365
when        6477        then        16483327
when        6478        then        16359626
when        6479        then        16359606
when        6480        then        16359937
when        6481        then        16359936
when        6482        then        16359924
when        6483        then        16359919
when        6484        then        16359922
when        6485        then        16359934
when        6486        then        16359898
when        6487        then        16359925
when        6488        then        16359938
when        6489        then        16359943
when        6490        then        16359905
when        6491        then        16359933
when        6492        then        16359913
when        6493        then        16359910
when        6494        then        16359901
when        6495        then        16359890
when        6496        then        16359900
when        6497        then        16359915
when        6498        then        16359911
when        6499        then        16359928
when        6500        then        16359696
when        6501        then        16359720
when        6502        then        16359737
when        6505        then        16359918
when        6506        then        16359940
when        6507        then        16359902
when        6508        then        16359921
when        6509        then        16359939
when        6510        then        16359914
when        6511        then        16359952
when        6512        then        16359958
when        6513        then        16359953
when        6514        then        16359951
when        6515        then        16359949
when        6516        then        16359956
when        6517        then        16359941
when        6518        then        16359957
when        6519        then        16359947
when        6520        then        16359955
when        6521        then        16359945
when        6522        then        16359954
when        6523        then        16359895
when        6524        then        16359944
when        6525        then        16359946
when        6526        then        16359942
when        6527        then        16359950
when        6528        then        16359948
when        6529        then        16359908
when        6530        then        16359926
when        6531        then        16359935
when        6532        then        16359903
when        6533        then        16359927
end as id  
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS bem,-- /case dos bens/
 (BP.vl_anterior - BP.vl_atual) as vlDepreciado,
 'Conversao de dados' as notaExplicativa
FROM PATRBensPatrimoniais  BP
join PAtrmovimentacao m on m.nr_chapa = BP.nr_chapa 
where cd_tipomovto = 12 and BP.cd_situacao = 1 
and BP.cd_EntidadeContabil = 1 
and m.dt_ocorrencia BETWEEN '2020-01-01 00:00:00' AND '2020-12-31 23:59:59'
        `;

        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        const transformedData = resultData.map(record => {
            return {
                //id: parseInt(record.id, 10), // Assume que existe um campo `id` no resultado do select
                depreciacao: {
                    id: JSON.parse(record.depreciacao).id
                },
                bem: {
                    id: JSON.parse(record.bem).id
                },
                vlDepreciado: parseFloat(record.vlDepreciado),
                notaExplicativa: record.notaExplicativa
            };
        });

        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        // Enviar cada registro individualmente para a rota desejada
         
        for (const record of transformedData) {
            const response = await fetch('https://patrimonio.betha.cloud/patrimonio-services/api/conversoes/lotes/depreciacao-bens', {
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