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
JSON_QUERY((SELECT 87525 as id  FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS depreciacao,-- /id da depreciação dependendo da data q to enviando ta la na betha/
JSON_QUERY((SELECT 
case bp.nr_chapa
when	4800	then	16888684
when	4801	then	16888694
when	4802	then	16888693
when	4803	then	16888691
when	4804	then	16888697
when	4805	then	16888685
when	4808	then	16888686
when	4809	then	16888739
when	4810	then	16888705
when	4811	then	16888722
when	4812	then	16888724
when	4813	then	16888715
when	4814	then	16888689
when	4815	then	16888742
when	4816	then	16888710
when	4817	then	16888687
when	4818	then	16888698
when	4820	then	16888700
when	4821	then	16888702
when	4822	then	16888730
when	4823	then	16888711
when	4824	then	16888701
when	4825	then	16888688
when	4919	then	16888716
when	4945	then	16888708
when	4946	then	16888713
when	4947	then	16888707
when	4968	then	16888692
when	4969	then	16888706
when	4973	then	16888712
when	4974	then	16888729
when	4975	then	16888738
when	4976	then	16888696
when	4977	then	16888703
when	4978	then	16888699
when	4979	then	16888704
when	4981	then	16888690
when	4993	then	16888714
when	4995	then	16888731
when	5012	then	16888695
when	5073	then	16888726
when	5074	then	16888723
when	5076	then	16888762
when	5122	then	16888728
when	5123	then	16888725
when	5124	then	16888859
when	5125	then	16888709
when	5126	then	16888720
when	5127	then	16888732
when	5128	then	16888718
when	5129	then	16888727
when	5130	then	16888717
when	5131	then	16888719
when	5132	then	16888740
when	5133	then	16888721
when	5134	then	16888735
when	5135	then	16888759
when	5136	then	16888733
when	5137	then	16888737
when	5138	then	16888736
when	5139	then	16888777
when	5149	then	16888746
when	5150	then	16888750
when	5151	then	16888747
when	5152	then	16888749
when	5153	then	16888763
when	5154	then	16888752
when	5158	then	16888758
when	5159	then	16888743
when	5160	then	16888764
when	5164	then	16888734
when	5165	then	16888766
when	5166	then	16888770
when	5167	then	16888761
when	5168	then	16888744
when	5175	then	16888771
when	5176	then	16888756
when	5177	then	16888741
when	5178	then	16888767
when	5179	then	16888769
when	5180	then	16888753
when	5181	then	16888751
when	5182	then	16888768
when	5183	then	16888748
when	5184	then	16888774
when	5220	then	16888773
when	5236	then	16888745
when	5237	then	16888775
when	5238	then	16888755
when	5240	then	16888760
when	5241	then	16888754
when	5242	then	16888776
when	5243	then	16888779
when	5244	then	16888772
when	5860	then	16888780
when	5861	then	16888765
when	5862	then	16888778
when	5877	then	16888757
when	5886	then	16888783
when	5887	then	16888792
when	5888	then	16888799
when	5889	then	16888794
when	5890	then	16888789
when	5891	then	16888790
when	5892	then	16888791
when	5893	then	16888824
when	5894	then	16888781
when	5895	then	16888795
when	5896	then	16888788
when	5897	then	16888784
when	5898	then	16888798
when	5899	then	16888785
when	5900	then	16888782
when	5901	then	16888797
when	5902	then	16888812
when	5903	then	16888822
when	5904	then	16888801
when	5905	then	16888803
when	5906	then	16888817
when	5907	then	16888806
when	5908	then	16888818
when	5909	then	16888793
when	5910	then	16888796
when	5911	then	16888808
when	5912	then	16888802
when	5913	then	16888813
when	5914	then	16888807
when	5915	then	16888809
when	5916	then	16888826
when	5917	then	16888815
when	5918	then	16888805
when	5919	then	16888843
when	5920	then	16888827
when	5921	then	16888786
when	5922	then	16888787
when	5923	then	16888811
when	5924	then	16888804
when	5925	then	16888814
when	5926	then	16888816
when	5927	then	16888800
when	5928	then	16888810
when	5929	then	16888821
when	5930	then	16888828
when	5931	then	16888823
when	5932	then	16888819
when	5933	then	16888820
when	5934	then	16888835
when	5935	then	16888862
when	5936	then	16888830
when	5937	then	16888825
when	5938	then	16888831
when	5939	then	16888829
when	5940	then	16888836
when	5941	then	16888832
when	5942	then	16888833
when	5943	then	16888849
when	5944	then	16888845
when	5945	then	16888834
when	5946	then	16888839
when	5947	then	16888842
when	5948	then	16888840
when	5949	then	16888856
when	5950	then	16888876
when	6005	then	16888837
when	6006	then	16888838
when	6007	then	16888841
when	6008	then	16888854
when	6009	then	16888866
when	6013	then	16888852
when	6014	then	16888872
when	6015	then	16888869
when	6016	then	16888844
when	6017	then	16888865
when	6018	then	16888867
when	6019	then	16888868
when	6020	then	16888846
when	6021	then	16888847
when	6022	then	16888848
when	6023	then	16888878
when	6024	then	16888850
when	6025	then	16888853
when	6027	then	16888855
when	6028	then	16888851
when	6029	then	16888860
when	6030	then	16888857
when	6031	then	16888881
when	6032	then	16888873
when	6033	then	16888880
when	6034	then	16888875
when	6035	then	16888858
when	6036	then	16888877
when	6037	then	16888874
when	6038	then	16888864
when	6039	then	16888861
when	6040	then	16888879
when	6041	then	16888863
when	6042	then	16888870
when	6043	then	16888871
when	6044	then	16888920
when	6045	then	16888890
when	6046	then	16888894
when	6047	then	16888895
when	6048	then	16888950
when	6049	then	16888981
when	6050	then	16888898
when	6051	then	16888888
when	6052	then	16888887
when	6053	then	16888883
when	6054	then	16888930
when	6055	then	16888896
when	6056	then	16888980
when	6057	then	16888907
when	6071	then	16888917
when	6072	then	16888882
when	6073	then	16888923
when	6075	then	16888921
when	6076	then	16888908
when	6078	then	16888905
when	6083	then	16888893
when	6084	then	16888902
when	6085	then	16888918
when	6086	then	16888937
when	6087	then	16888919
when	6088	then	16888934
when	6089	then	16888889
when	6090	then	16888906
when	6091	then	16888945
when	6092	then	16888910
when	6093	then	16888913
when	6094	then	16888970
when	6095	then	16888900
when	6096	then	16888897
when	6097	then	16888972
when	6098	then	16888885
when	6099	then	16888899
when	6100	then	16888979
when	6101	then	16888944
when	6102	then	16888892
when	6103	then	16888973
when	6104	then	16888967
when	6105	then	16888969
when	6106	then	16888903
when	6107	then	16888891
when	6108	then	16888914
when	6109	then	16888964
when	6110	then	16888968
when	6111	then	16888971
when	6112	then	16888909
when	6113	then	16888963
when	6171	then	16888974
when	6172	then	16888886
when	6173	then	16888960
when	6174	then	16888884
when	6175	then	16888962
when	6176	then	16888966
when	6177	then	16888933
when	6178	then	16888935
when	6179	then	16888958
when	6180	then	16888939
when	6181	then	16888977
when	6182	then	16888904
when	6183	then	16888957
when	6184	then	16888965
when	6185	then	16888961
when	6186	then	16888925
when	6187	then	16888959
when	6188	then	16888956
when	6189	then	16888955
when	6190	then	16888940
when	6191	then	16888926
when	6192	then	16888929
when	6193	then	16888924
when	6194	then	16888936
when	6195	then	16888954
when	6196	then	16888948
when	6197	then	16888975
when	6198	then	16888932
when	6199	then	16888941
when	6200	then	16888946
when	6201	then	16888949
when	6202	then	16888928
when	6203	then	16888951
when	6204	then	16888901
when	6205	then	16888953
when	6206	then	16888942
when	6207	then	16888927
when	6208	then	16888943
when	6209	then	16888947
when	6210	then	16888912
when	6211	then	16888916
when	6212	then	16888952
when	6213	then	16888915
when	6214	then	16888931
when	6215	then	16888938
when	6216	then	16888976
when	6217	then	16888922
when	6218	then	16888911
when	6219	then	16888978
when	6220	then	16888989
when	6221	then	16888996
when	6222	then	16888999
when	6223	then	16888991
when	6224	then	16888986
when	6225	then	16888992
when	6226	then	16888983
when	6227	then	16888984
when	6228	then	16888988
when	6229	then	16888995
when	6230	then	16889079
when	6231	then	16889000
when	6232	then	16889023
when	6233	then	16889053
when	6234	then	16889080
when	6235	then	16889046
when	6236	then	16889014
when	6237	then	16889005
when	6238	then	16889050
when	6239	then	16889047
when	6240	then	16889049
when	6241	then	16888994
when	6242	then	16889022
when	6243	then	16889061
when	6244	then	16889045
when	6245	then	16888985
when	6246	then	16888990
when	6247	then	16889040
when	6248	then	16889043
when	6249	then	16889048
when	6250	then	16889058
when	6251	then	16889044
when	6252	then	16888987
when	6253	then	16889054
when	6254	then	16889039
when	6255	then	16889031
when	6256	then	16888998
when	6257	then	16889036
when	6258	then	16889035
when	6259	then	16889006
when	6260	then	16889041
when	6261	then	16888997
when	6262	then	16889028
when	6263	then	16889055
when	6264	then	16889034
when	6265	then	16889027
when	6266	then	16889037
when	6267	then	16889038
when	6268	then	16889056
when	6269	then	16889033
when	6270	then	16889016
when	6271	then	16889026
when	6272	then	16889030
when	6273	then	16889052
when	6287	then	16889042
when	6288	then	16889021
when	6289	then	16889060
when	6299	then	16889059
when	6300	then	16889009
when	6301	then	16889065
when	6303	then	16889057
when	6304	then	16889081
when	6305	then	16889029
when	6307	then	16889032
when	6308	then	16889071
when	6309	then	16889066
when	6310	then	16889064
when	6313	then	16889024
when	6314	then	16889020
when	6315	then	16889072
when	6316	then	16889063
when	6317	then	16889001
when	6319	then	16889070
when	6320	then	16889010
when	6322	then	16889025
when	6323	then	16889008
when	6328	then	16889002
when	6329	then	16889012
when	6330	then	16889013
when	6331	then	16889003
when	6332	then	16889019
when	6333	then	16889062
when	6334	then	16889017
when	6335	then	16889011
when	6336	then	16888993
when	6337	then	16889007
when	6338	then	16889068
when	6339	then	16889073
when	6340	then	16889015
when	6341	then	16888982
when	6342	then	16889004
when	6343	then	16889074
when	6344	then	16889069
when	6345	then	16889018
when	6346	then	16889078
when	6347	then	16889075
when	6348	then	16889051
when	6349	then	16889067
when	6350	then	16889077
when	6351	then	16889076
when	6352	then	16889179
when	6353	then	16889087
when	6354	then	16889086
when	6355	then	16889094
when	6356	then	16889090
when	6357	then	16889110
when	6358	then	16889162
when	6359	then	16889096
when	6360	then	16889098
when	6361	then	16889161
when	6362	then	16889115
when	6363	then	16889116
when	6364	then	16889173
when	6365	then	16889088
when	6366	then	16889117
when	6367	then	16889107
when	6368	then	16889091
when	6369	then	16889095
when	6370	then	16889119
when	6371	then	16889114
when	6372	then	16889174
when	6373	then	16889130
when	6374	then	16889165
when	6375	then	16889164
when	6376	then	16889092
when	6377	then	16889084
when	6378	then	16889106
when	6379	then	16889160
when	6380	then	16889111
when	6381	then	16889168
when	6382	then	16889100
when	6383	then	16889118
when	6384	then	16889108
when	6385	then	16889112
when	6386	then	16889121
when	6387	then	16889105
when	6388	then	16889109
when	6389	then	16889099
when	6390	then	16889082
when	6391	then	16889102
when	6392	then	16889083
when	6393	then	16889093
when	6394	then	16889170
when	6395	then	16889153
when	6396	then	16889158
when	6397	then	16889097
when	6398	then	16889178
when	6399	then	16889157
when	6400	then	16889132
when	6401	then	16889151
when	6402	then	16889145
when	6403	then	16889147
when	6404	then	16889089
when	6405	then	16889146
when	6406	then	16889085
when	6407	then	16889148
when	6408	then	16889154
when	6409	then	16889104
when	6410	then	16889166
when	6411	then	16889149
when	6412	then	16889156
when	6413	then	16889152
when	6414	then	16889155
when	6415	then	16889180
when	6416	then	16889150
when	6417	then	16889143
when	6418	then	16889177
when	6419	then	16889141
when	6420	then	16889175
when	6421	then	16889144
when	6422	then	16889159
when	6423	then	16889142
when	6424	then	16889176
when	6425	then	16889113
when	6426	then	16889167
when	6427	then	16889120
when	6428	then	16889172
when	6429	then	16889126
when	6430	then	16889181
when	6431	then	16889133
when	6432	then	16889129
when	6433	then	16889137
when	6434	then	16889135
when	6435	then	16889124
when	6436	then	16889131
when	6437	then	16889128
when	6438	then	16889140
when	6439	then	16889122
when	6440	then	16889138
when	6441	then	16889127
when	6442	then	16889139
when	6443	then	16889163
when	6444	then	16889134
when	6445	then	16889103
when	6446	then	16889169
when	6447	then	16889101
when	6448	then	16889123
when	6449	then	16889125
when	6450	then	16889171
when	6451	then	16889136
when	6452	then	16889187
when	6453	then	16889212
when	6454	then	16889220
when	6455	then	16889190
when	6456	then	16889199
when	6457	then	16889198
when	6458	then	16889192
when	6459	then	16889185
when	6460	then	16889209
when	6461	then	16889188
when	6462	then	16889196
when	6463	then	16889204
when	6464	then	16889189
when	6465	then	16889183
when	6466	then	16889223
when	6467	then	16889182
when	6468	then	16889210
when	6472	then	16889202
when	6473	then	16889215
when	6474	then	16889232
when	6477	then	16889194
when	6478	then	16889278
when	6479	then	16889227
when	6480	then	16889211
when	6481	then	16889205
when	6482	then	16889213
when	6483	then	16889203
when	6484	then	16889216
when	6485	then	16889217
when	6486	then	16889186
when	6487	then	16889197
when	6488	then	16889264
when	6489	then	16889184
when	6490	then	16889263
when	6491	then	16889229
when	6492	then	16889266
when	6493	then	16889260
when	6494	then	16889274
when	6495	then	16889262
when	6496	then	16889200
when	6497	then	16889191
when	6498	then	16889275
when	6499	then	16889195
when	6500	then	16889273
when	6501	then	16889193
when	6502	then	16889270
when	6505	then	16889267
when	6506	then	16889265
when	6507	then	16889254
when	6508	then	16889261
when	6509	then	16889269
when	6510	then	16889276
when	6511	then	16889257
when	6512	then	16889252
when	6513	then	16889246
when	6514	then	16889249
when	6515	then	16889271
when	6516	then	16889268
when	6517	then	16889250
when	6518	then	16889251
when	6519	then	16889280
when	6520	then	16889243
when	6521	then	16889238
when	6522	then	16889247
when	6523	then	16889201
when	6524	then	16889241
when	6525	then	16889228
when	6526	then	16889222
when	6527	then	16889239
when	6528	then	16889277
when	6529	then	16889221
when	6530	then	16889237
when	6531	then	16889242
when	6532	then	16889219
when	6533	then	16889259
when	6559	then	16889258
when	6583	then	16889235
when	6584	then	16889225
when	6585	then	16889256
when	6586	then	16889231
when	6587	then	16889245
when	6588	then	16889226
when	6589	then	16889206
when	6590	then	16889234
when	6637	then	16889248
when	6638	then	16889240
when	6639	then	16889236
when	6640	then	16889244
when	6641	then	16889253
when	6642	then	16889255
when	6643	then	16889214
when	6644	then	16889233
when	6645	then	16889272
when	6646	then	16889218
when	6647	then	16889224
when	6648	then	16889208
when	6649	then	16889230
when	6650	then	16889279
when	6651	then	16889207
when	6652	then	16889302
when	6653	then	16889288
when	6654	then	16889294
when	6655	then	16889283
when	6656	then	16889291
when	6657	then	16889300
when	6658	then	16889281
when	6659	then	16889282
when	6670	then	16889292
when	6671	then	16889298
when	6672	then	16889290
when	6673	then	16889287
when	6711	then	16889295
when	6712	then	16889289
when	6718	then	16889297
when	6719	then	16889284
when	6720	then	16889301
when	6721	then	16889286
when	6728	then	16889285
when	6737	then	16889296
when	6738	then	16889303
when	6739	then	16889299
when	6746	then	16889293
end as id  
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS bem,-- /case dos bens/
 abs (m.vl_movimento) as vlDepreciado,
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
                conteudo: {
                    depreciacaoBens: [{
                        depreciacao: {
                            id: JSON.parse(record.depreciacao).id
                        },
                        bem: {
                            id: JSON.parse(record.bem).id
                        },
                        vlDepreciado: parseFloat(record.vlDepreciado),
                }]
            }
            };
        });

        /*   const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }

        return */

        const chunkArray = (array, size) => {
            const chunked = [];
            for (let i = 0; i < array.length; i += size) {
                chunked.push(array.slice(i, i + size));
            }
            return chunked;
        };

        const batchedData = chunkArray(transformedData, 50);
        let report = [];
        let reportIds = [];

        for (const batch of batchedData) {
            try {
                console.log('Enviando o seguinte corpo para a API:', JSON.stringify(batch, null, 2));

                const response = await fetch(`https://patrimonio.betha.cloud/patrimonio-services/api/conversoes/lotes/depreciacao-bens`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer 25a840ae-b57a-4030-903a-bcccf2386f30'
                    },
                    body: JSON.stringify(batch)
                });

                const responseBody = await response.json();

                if (response.ok) {
                    console.log('Dados enviados com sucesso para a API.');
                    batch.forEach(record => {
                        report.push({ record, status: 'success', response: responseBody });
                    });

                    if (responseBody.idLote) {
                        reportIds.push(responseBody.idLote);
                    }
                } else {
                    console.error('Erro ao enviar os dados para a API:', response.statusText);
                    batch.forEach(record => {
                        report.push({ record, status: 'failed', response: responseBody });
                    });
                }
            } catch (err) {
                console.error('Erro ao enviar o batch para a API:', err);
                batch.forEach(record => {
                    report.push({ record, status: 'error', error: err.message });
                });
            }
        }

        // Save the report in 'report.json'
        fs.writeFileSync('report.json', JSON.stringify(report, null, 2));
        console.log('Relatório salvo em report.json com sucesso.');

        // Save the reportIds in the 'report_id.json' file
        fs.writeFileSync('report_id.json', JSON.stringify(reportIds, null, 2));
        console.log('report_id.json salvo com sucesso.');

    } catch (error) {
        console.error('Erro no processo:', error);
    } finally {
        await sql.close(); // Close the connection with SQL Server
        console.log('Conexão com o SQL Server fechada.');
    }
}

// Execute the main function
main();