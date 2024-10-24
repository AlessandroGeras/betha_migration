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

function formatDate(date) {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (`0${d.getMonth() + 1}`).slice(-2);
    const day = (`0${d.getDate()}`).slice(-2);
    return `${year}-${month}-${day}`;
}

async function main() {
    try {
        // Conectar ao SQL Server
        const masterConnection = await connectToSqlServer();

        // Selecionar o banco de dados "CONTABIL2024"
        const selectDatabaseQuery = 'USE CONTABIL2024';
        await masterConnection.query(selectDatabaseQuery);

        // Executar a consulta SQL
        const userQuery = `
            select 
ROW_NUMBER() OVER(ORDER BY a.cd_Exercicio) as idIntegracao,
JSON_QUERY(
(SELECT
a.cd_Exercicio as exercicio,
'false' as validaSaldo,
JSON_QUERY(
(SELECT
                        case  at.cd_FichaDespDestino
when 338 then 1725827
when 339 then 1725827
when 340 then 1725828
when 341 then 1725828
when 318 then 1725829
when 348 then 1725830
when 349 then 1725830
when 12 then 1734747
when 13 then 1734748
when 14 then 1734749
when 15 then 1734750
when 16 then 1734751
when 17 then 1734752
when 18 then 1734753
when 19 then 1734754
when 20 then 1734755
when 21 then 1734756
when 22 then 1734757
when 23 then 1734758
when 24 then 1734759
when 25 then 1734760
when 26 then 1734761
when 27 then 1734762
when 28 then 1734763
when 29 then 1734764
when 30 then 1734765
when 31 then 1734766
when 32 then 1734767
when 33 then 1734768
when 34 then 1734769
when 35 then 1734770
when 36 then 1734771
when 37 then 1734772
when 38 then 1734773
when 39 then 1734774
when 40 then 1734775
when 41 then 1734776
when 42 then 1734777
when 43 then 1734777
when 44 then 1734778
when 45 then 1734779
when 46 then 1734780
when 47 then 1734781
when 48 then 1734782
when 49 then 1734783
when 50 then 1734784
when 51 then 1734785
when 52 then 1734786
when 53 then 1734787
when 54 then 1734788
when 55 then 1734789
when 56 then 1734790
when 57 then 1734791
when 58 then 1734792
when 59 then 1734793
when 60 then 1734794
when 61 then 1734795
when 62 then 1734796
when 63 then 1734797
when 64 then 1734798
when 65 then 1734799
when 66 then 1734800
when 67 then 1734801
when 68 then 1734802
when 69 then 1734803
when 70 then 1734804
when 71 then 1734805
when 72 then 1734806
when 73 then 1734807
when 74 then 1734808
when 75 then 1734809
when 76 then 1734810
when 77 then 1734811
when 78 then 1734812
when 79 then 1734813
when 80 then 1734814
when 81 then 1734815
when 82 then 1734816
when 83 then 1734817
when 84 then 1734818
when 85 then 1734819
when 86 then 1734820
when 87 then 1734821
when 88 then 1734822
when 89 then 1734823
when 90 then 1734824
when 91 then 1734825
when 92 then 1734826
when 93 then 1734827
when 94 then 1734828
when 95 then 1734829
when 96 then 1734830
when 97 then 1734831
when 98 then 1734832
when 99 then 1734833
when 100 then 1734834
when 101 then 1734835
when 102 then 1734836
when 103 then 1734837
when 104 then 1734838
when 105 then 1734839
when 106 then 1734840
when 107 then 1734841
when 108 then 1734842
when 109 then 1734843
when 110 then 1734844
when 111 then 1734845
when 112 then 1734846
when 113 then 1734847
when 12 then 1734747
when 13 then 1734748
when 14 then 1734749
when 15 then 1734750
when 16 then 1734751
when 17 then 1734752
when 18 then 1734753
when 19 then 1734754
when 20 then 1734755
when 21 then 1734756
when 22 then 1734757
when 23 then 1734758
when 24 then 1734759
when 25 then 1734760
when 26 then 1734761
when 27 then 1734762
when 28 then 1734763
when 29 then 1734764
when 30 then 1734765
when 31 then 1734766
when 32 then 1734767
when 33 then 1734768
when 34 then 1734769
when 35 then 1734770
when 36 then 1734771
when 37 then 1734772
when 38 then 1734773
when 39 then 1734774
when 40 then 1734775
when 41 then 1734776
when 42 then 1734777
when 44 then 1734778
when 45 then 1734779
when 46 then 1734780
when 47 then 1734781
when 48 then 1734782
when 49 then 1734783
when 50 then 1734784
when 51 then 1734785
when 52 then 1734786
when 53 then 1734787
when 54 then 1734788
when 55 then 1734789
when 56 then 1734790
when 57 then 1734791
when 58 then 1734792
when 59 then 1734793
when 60 then 1734794
when 61 then 1734795
when 62 then 1734796
when 63 then 1734797
when 64 then 1734798
when 65 then 1734799
when 66 then 1734800
when 67 then 1734801
when 68 then 1734802
when 69 then 1734803
when 70 then 1734804
when 71 then 1734805
when 72 then 1734806
when 73 then 1734807
when 74 then 1734808
when 75 then 1734809
when 76 then 1734810
when 77 then 1734811
when 78 then 1734812
when 79 then 1734813
when 80 then 1734814
when 81 then 1734815
when 82 then 1734816
when 83 then 1734817
when 84 then 1734818
when 85 then 1734819
when 86 then 1734820
when 87 then 1734821
when 88 then 1734822
when 89 then 1734823
when 90 then 1734824
when 91 then 1734825
when 92 then 1734826
when 93 then 1734827
when 94 then 1734828
when 95 then 1734829
when 96 then 1734830
when 97 then 1734831
when 98 then 1734832
when 99 then 1734833
when 100 then 1734834
when 101 then 1734835
when 102 then 1734836
when 103 then 1734837
when 104 then 1734838
when 105 then 1734839
when 106 then 1734840
when 107 then 1734841
when 108 then 1734842
when 109 then 1734843
when 110 then 1734844
when 111 then 1734845
when 112 then 1734846
when 113 then 1734847
when 12 then 1734747
when 13 then 1734748
when 14 then 1734749
when 15 then 1734750
when 16 then 1734751
when 17 then 1734752
when 18 then 1734753
when 19 then 1734754
when 20 then 1734755
when 21 then 1734756
when 22 then 1734757
when 23 then 1734758
when 24 then 1734759
when 25 then 1734760
when 26 then 1734761
when 27 then 1734762
when 28 then 1734763
when 29 then 1734764
when 30 then 1734765
when 31 then 1734766
when 32 then 1734767
when 33 then 1734768
when 34 then 1734769
when 35 then 1734770
when 36 then 1734771
when 37 then 1734772
when 38 then 1734773
when 39 then 1734774
when 40 then 1734775
when 41 then 1734776
when 42 then 1734777
when 44 then 1734778
when 45 then 1734779
when 46 then 1734780
when 47 then 1734781
when 48 then 1734782
when 49 then 1734783
when 50 then 1734784
when 51 then 1734785
when 52 then 1734786
when 53 then 1734787
when 54 then 1734788
when 55 then 1734789
when 56 then 1734790
when 57 then 1734791
when 58 then 1734792
when 59 then 1734793
when 60 then 1734794
when 61 then 1734795
when 62 then 1734796
when 63 then 1734797
when 64 then 1734798
when 65 then 1734799
when 66 then 1734800
when 67 then 1734801
when 68 then 1734802
when 69 then 1734803
when 70 then 1734804
when 71 then 1734805
when 72 then 1734806
when 73 then 1734807
when 74 then 1734808
when 75 then 1734809
when 76 then 1734810
when 77 then 1734811
when 78 then 1734812
when 79 then 1734813
when 80 then 1734814
when 81 then 1734815
when 82 then 1734816
when 83 then 1734817
when 84 then 1734818
when 85 then 1734819
when 86 then 1734820
when 87 then 1734821
when 88 then 1734822
when 89 then 1734823
when 90 then 1734824
when 91 then 1734825
when 92 then 1734826
when 93 then 1734827
when 94 then 1734828
when 95 then 1734829
when 96 then 1734830
when 97 then 1734831
when 98 then 1734832
when 99 then 1734833
when 100 then 1734834
when 101 then 1734835
when 102 then 1734836
when 103 then 1734837
when 104 then 1734838
when 105 then 1734839
when 106 then 1734840
when 107 then 1734841
when 108 then 1734842
when 109 then 1734843
when 110 then 1734844
when 111 then 1734845
when 112 then 1734846
when 113 then 1734847
when 12 then 1734747
when 13 then 1734748
when 14 then 1734749
when 15 then 1734750
when 16 then 1734751
when 17 then 1734752
when 18 then 1734753
when 19 then 1734754
when 20 then 1734755
when 21 then 1734756
when 22 then 1734757
when 23 then 1734758
when 24 then 1734759
when 25 then 1734760
when 26 then 1734761
when 27 then 1734762
when 28 then 1734763
when 29 then 1734764
when 30 then 1734765
when 31 then 1734766
when 32 then 1734767
when 33 then 1734768
when 34 then 1734769
when 35 then 1734770
when 36 then 1734771
when 37 then 1734772
when 38 then 1734773
when 39 then 1734774
when 40 then 1734775
when 41 then 1734776
when 42 then 1734777
when 44 then 1734778
when 45 then 1734779
when 46 then 1734780
when 47 then 1734781
when 48 then 1734782
when 49 then 1734783
when 50 then 1734784
when 51 then 1734785
when 52 then 1734786
when 53 then 1734787
when 54 then 1734788
when 55 then 1734789
when 56 then 1734790
when 57 then 1734791
when 58 then 1734792
when 59 then 1734793
when 60 then 1734794
when 61 then 1734795
when 62 then 1734796
when 63 then 1734797
when 64 then 1734798
when 65 then 1734799
when 66 then 1734800
when 67 then 1734801
when 68 then 1734802
when 69 then 1734803
when 70 then 1734804
when 71 then 1734805
when 72 then 1734806
when 73 then 1734807
when 74 then 1734808
when 75 then 1734809
when 76 then 1734810
when 77 then 1734811
when 78 then 1734812
when 79 then 1734813
when 80 then 1734814
when 81 then 1734815
when 82 then 1734816
when 83 then 1734817
when 84 then 1734818
when 85 then 1734819
when 86 then 1734820
when 87 then 1734821
when 88 then 1734822
when 89 then 1734823
when 90 then 1734824
when 91 then 1734825
when 92 then 1734826
when 93 then 1734827
when 94 then 1734828
when 95 then 1734829
when 96 then 1734830
when 97 then 1734831
when 98 then 1734832
when 99 then 1734833
when 100 then 1734834
when 101 then 1734835
when 102 then 1734836
when 103 then 1734837
when 104 then 1734838
when 105 then 1734839
when 106 then 1734840
when 107 then 1734841
when 108 then 1734842
when 109 then 1734843
when 110 then 1734844
when 111 then 1734845
when 112 then 1734846
when 113 then 1734847
when 12 then 1734747
when 13 then 1734748
when 14 then 1734749
when 15 then 1734750
when 16 then 1734751
when 17 then 1734752
when 18 then 1734753
when 19 then 1734754
when 20 then 1734755
when 21 then 1734756
when 22 then 1734757
when 23 then 1734758
when 24 then 1734759
when 25 then 1734760
when 26 then 1734761
when 27 then 1734762
when 28 then 1734763
when 29 then 1734764
when 30 then 1734765
when 31 then 1734766
when 32 then 1734767
when 33 then 1734768
when 34 then 1734769
when 35 then 1734770
when 36 then 1734771
when 37 then 1734772
when 38 then 1734773
when 39 then 1734774
when 40 then 1734775
when 41 then 1734776
when 42 then 1734777
when 44 then 1734778
when 45 then 1734779
when 46 then 1734780
when 47 then 1734781
when 48 then 1734782
when 49 then 1734783
when 50 then 1734784
when 51 then 1734785
when 52 then 1734786
when 53 then 1734787
when 54 then 1734788
when 55 then 1734789
when 56 then 1734790
when 57 then 1734791
when 58 then 1734792
when 59 then 1734793
when 60 then 1734794
when 61 then 1734795
when 62 then 1734796
when 63 then 1734797
when 64 then 1734798
when 65 then 1734799
when 66 then 1734800
when 67 then 1734801
when 68 then 1734802
when 69 then 1734803
when 70 then 1734804
when 71 then 1734805
when 72 then 1734806
when 73 then 1734807
when 74 then 1734808
when 75 then 1734809
when 76 then 1734810
when 77 then 1734811
when 78 then 1734812
when 79 then 1734813
when 80 then 1734814
when 81 then 1734815
when 82 then 1734816
when 83 then 1734817
when 84 then 1734818
when 85 then 1734819
when 86 then 1734820
when 87 then 1734821
when 88 then 1734822
when 89 then 1734823
when 90 then 1734824
when 91 then 1734825
when 92 then 1734826
when 93 then 1734827
when 94 then 1734828
when 95 then 1734829
when 96 then 1734830
when 97 then 1734831
when 98 then 1734832
when 99 then 1734833
when 100 then 1734834
when 101 then 1734835
when 102 then 1734836
when 103 then 1734837
when 104 then 1734838
when 105 then 1734839
when 106 then 1734840
when 107 then 1734841
when 108 then 1734842
when 109 then 1734843
when 110 then 1734844
when 111 then 1734845
when 112 then 1734846
when 113 then 1734847
when 12 then 1734747
when 13 then 1734748
when 14 then 1734749
when 15 then 1734750
when 16 then 1734751
when 17 then 1734752
when 18 then 1734753
when 19 then 1734754
when 20 then 1734755
when 21 then 1734756
when 22 then 1734757
when 23 then 1734758
when 24 then 1734759
when 25 then 1734760
when 26 then 1734761
when 27 then 1734762
when 28 then 1734763
when 29 then 1734764
when 30 then 1734765
when 31 then 1734766
when 32 then 1734767
when 33 then 1734768
when 34 then 1734769
when 35 then 1734770
when 36 then 1734771
when 37 then 1734772
when 38 then 1734773
when 39 then 1734774
when 40 then 1734775
when 41 then 1734776
when 42 then 1734777
when 44 then 1734778
when 45 then 1734779
when 46 then 1734780
when 47 then 1734781
when 48 then 1734782
when 49 then 1734783
when 50 then 1734784
when 51 then 1734785
when 52 then 1734786
when 53 then 1734787
when 54 then 1734788
when 55 then 1734789
when 56 then 1734790
when 57 then 1734791
when 58 then 1734792
when 59 then 1734793
when 60 then 1734794
when 61 then 1734795
when 62 then 1734796
when 63 then 1734797
when 64 then 1734798
when 65 then 1734799
when 66 then 1734800
when 67 then 1734801
when 68 then 1734802
when 69 then 1734803
when 70 then 1734804
when 71 then 1734805
when 72 then 1734806
when 73 then 1734807
when 74 then 1734808
when 75 then 1734809
when 76 then 1734810
when 77 then 1734811
when 78 then 1734812
when 79 then 1734813
when 80 then 1734814
when 81 then 1734815
when 82 then 1734816
when 83 then 1734817
when 84 then 1734818
when 85 then 1734819
when 86 then 1734820
when 87 then 1734821
when 88 then 1734822
when 89 then 1734823
when 90 then 1734824
when 91 then 1734825
when 92 then 1734826
when 93 then 1734827
when 94 then 1734828
when 95 then 1734829
when 96 then 1734830
when 97 then 1734831
when 98 then 1734832
when 99 then 1734833
when 100 then 1734834
when 101 then 1734835
when 102 then 1734836
when 103 then 1734837
when 104 then 1734838
when 105 then 1734839
when 106 then 1734840
when 107 then 1734841
when 108 then 1734842
when 109 then 1734843
when 110 then 1734844
when 111 then 1734845
when 112 then 1734846
when 113 then 1734847
when 12 then 1734747
when 13 then 1734748
when 14 then 1734749
when 15 then 1734750
when 16 then 1734751
when 17 then 1734752
when 18 then 1734753
when 19 then 1734754
when 20 then 1734755
when 21 then 1734756
when 22 then 1734757
when 23 then 1734758
when 24 then 1734759
when 25 then 1734760
when 26 then 1734761
when 27 then 1734762
when 28 then 1734763
when 29 then 1734764
when 30 then 1734765
when 31 then 1734766
when 32 then 1734767
when 33 then 1734768
when 34 then 1734769
when 35 then 1734770
when 36 then 1734771
when 37 then 1734772
when 38 then 1734773
when 39 then 1734774
when 40 then 1734775
when 41 then 1734776
when 42 then 1734777
when 44 then 1734778
when 45 then 1734779
when 46 then 1734780
when 47 then 1734781
when 48 then 1734782
when 49 then 1734783
when 50 then 1734784
when 51 then 1734785
when 52 then 1734786
when 53 then 1734787
when 54 then 1734788
when 55 then 1734789
when 56 then 1734790
when 57 then 1734791
when 58 then 1734792
when 59 then 1734793
when 60 then 1734794
when 61 then 1734795
when 62 then 1734796
when 63 then 1734797
when 64 then 1734798
when 65 then 1734799
when 66 then 1734800
when 67 then 1734801
when 68 then 1734802
when 69 then 1734803
when 70 then 1734804
when 71 then 1734805
when 72 then 1734806
when 73 then 1734807
when 74 then 1734808
when 75 then 1734809
when 76 then 1734810
when 77 then 1734811
when 78 then 1734812
when 79 then 1734813
when 80 then 1734814
when 81 then 1734815
when 82 then 1734816
when 83 then 1734817
when 84 then 1734818
when 85 then 1734819
when 86 then 1734820
when 87 then 1734821
when 88 then 1734822
when 89 then 1734823
when 90 then 1734824
when 91 then 1734825
when 92 then 1734826
when 93 then 1734827
when 94 then 1734828
when 95 then 1734829
when 96 then 1734830
when 97 then 1734831
when 98 then 1734832
when 99 then 1734833
when 100 then 1734834
when 101 then 1734835
when 102 then 1734836
when 103 then 1734837
when 104 then 1734838
when 105 then 1734839
when 106 then 1734840
when 107 then 1734841
when 108 then 1734842
when 109 then 1734843
when 110 then 1734844
when 111 then 1734845
when 112 then 1734846
when 113 then 1734847
when 114 then 1734848
when 115 then 1734849
when 116 then 1734850
when 117 then 1734851
when 118 then 1734852
when 119 then 1734853
when 120 then 1734854
when 121 then 1734855
when 122 then 1734856
when 123 then 1734857
when 124 then 1734858
when 125 then 1734859
when 126 then 1734860
when 127 then 1734861
when 128 then 1734862
when 129 then 1734863
when 130 then 1734864
when 131 then 1734865
when 132 then 1734866
when 133 then 1734867
when 134 then 1734868
when 135 then 1734869
when 136 then 1734870
when 137 then 1734871
when 138 then 1734872
when 139 then 1734873
when 140 then 1734874
when 141 then 1734875
when 142 then 1734876
when 143 then 1734877
when 144 then 1734878
when 145 then 1734879
when 146 then 1734880
when 147 then 1734881
when 148 then 1734882
when 149 then 1734883
when 150 then 1734884
when 151 then 1734885
when 152 then 1734886
when 153 then 1734887
when 154 then 1734888
when 155 then 1734889
when 156 then 1734890
when 157 then 1734891
when 158 then 1734892
when 159 then 1734893
when 160 then 1734894
when 161 then 1734895
when 162 then 1734896
when 163 then 1734897
when 164 then 1734898
when 165 then 1734899
when 166 then 1734900
when 167 then 1734901
when 168 then 1734902
when 169 then 1734903
when 170 then 1734904
when 171 then 1734905
when 172 then 1734906
when 173 then 1734907
when 174 then 1734908
when 175 then 1734909
when 176 then 1734910
when 177 then 1734911
when 178 then 1734912
when 179 then 1734913
when 180 then 1734914
when 181 then 1734915
when 182 then 1734916
when 183 then 1734917
when 184 then 1734917
when 185 then 1734918
when 186 then 1734919
when 187 then 1734920
when 188 then 1734921
when 189 then 1734922
when 190 then 1734923
when 191 then 1734924
when 192 then 1734925
when 193 then 1734926
when 194 then 1734927
when 195 then 1734928
when 196 then 1734929
when 197 then 1734930
when 198 then 1734931
when 199 then 1734932
when 200 then 1734933
when 201 then 1734934
when 202 then 1734935
when 203 then 1734936
when 204 then 1734937
when 205 then 1734938
when 206 then 1734939
when 207 then 1734940
when 208 then 1734941
when 209 then 1734942
when 210 then 1734943
when 211 then 1734944
when 212 then 1734945
when 213 then 1734946
when 214 then 1734947
when 215 then 1734948
when 216 then 1734949
when 217 then 1734950
when 218 then 1734951
when 219 then 1734952
when 220 then 1734953
when 221 then 1734954
when 222 then 1734955
when 223 then 1734956
when 224 then 1734957
when 225 then 1734958
when 226 then 1734959
when 227 then 1734960
when 228 then 1734961
when 229 then 1734962
when 230 then 1734963
when 231 then 1734964
when 232 then 1734965
when 233 then 1734966
when 234 then 1734967
when 235 then 1734968
when 236 then 1734969
when 237 then 1734970
when 238 then 1734971
when 239 then 1734972
when 240 then 1734973
when 241 then 1734974
when 242 then 1734975
when 243 then 1734975
when 244 then 1734976
when 245 then 1734977
when 246 then 1734978
when 247 then 1734979
when 248 then 1734980
when 249 then 1734981
when 250 then 1734982
when 251 then 1734983
when 252 then 1734984
when 253 then 1734985
when 254 then 1734986
when 255 then 1734987
when 256 then 1734988
when 257 then 1734989
when 258 then 1734990
when 259 then 1734991
when 260 then 1734992
when 261 then 1734993
when 262 then 1734994
when 263 then 1734995
when 264 then 1734996
when 265 then 1734997
when 266 then 1734998
when 267 then 1734999
when 268 then 1735000
when 269 then 1735001
when 270 then 1735002
when 271 then 1735003
when 272 then 1735004
when 273 then 1735005
when 274 then 1735006
when 275 then 1735007
when 276 then 1735008
when 277 then 1735009
when 278 then 1735010
when 279 then 1735011
when 280 then 1735012
when 281 then 1735013
when 282 then 1735014
when 283 then 1735015
when 284 then 1735016
when 285 then 1735017
when 286 then 1735018
when 287 then 1735019
when 288 then 1735020
when 289 then 1735021
when 290 then 1735022
when 291 then 1735023
when 292 then 1735024
when 293 then 1735025
when 294 then 1735026
when 295 then 1735027
when 296 then 1735028
when 297 then 1735029
when 298 then 1735030
when 299 then 1735031
when 300 then 1735032
when 301 then 1735033
when 302 then 1735034
when 303 then 1735035
when 304 then 1735036
when 305 then 1735037
when 306 then 1735038
when 307 then 1735039
when 308 then 1735040
when 309 then 1735041
when 310 then 1735042
when 311 then 1735043
when 312 then 1735044
when 313 then 1735045
when 314 then 1735046
when 315 then 1735047
when 1 then 1735048
when 2 then 1735049
when 3 then 1735050
when 4 then 1735051
when 5 then 1735052
when 6 then 1735053
when 7 then 1735054
when 8 then 1735055
when 9 then 1735056
when 10 then 1735057
when 11 then 1735058
when 327 then 1725833
when 323 then 1725831
when 324 then 1725825
when 325  then 1725826
when 326 then 1725832
when 328 then 1734769
when 336  then 1725834
when 337   then 1725835
                                    end as id
									
                    FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS despesa,
			at.vl_AlteracaoOrcamentaria	valor,
			'ABERTURA_CREDITO_ADICIONAL_SUPLEMENTAR' as via,
			     a.ds_Justificativa                                    as finalidade,
				 'true' as desconsideraLimite,
				  'DESPESA' as tipo,
JSON_QUERY(
                        (SELECT

'DESPESA' as tipo,
JSON_QUERY(
                        (SELECT
						11092 as id

FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS origem,
			at.vl_AlteracaoOrcamentaria	as valor,
               
			JSON_QUERY(
                (SELECT	
                    		   
			   
			JSON_QUERY(
                (
                    SELECT
                        CASE at.cd_DestinacaoRecursoDestino
                            when         155200000000       then        744181
when         155300000000       then        744183
when         156900000000       then        744185
when         157100000000       then        744189
when         159900000000       then        744201
when         170500000000       then        744251
when         170600003110       then        744255
when         170800000000       then        744261
when         175000000000       then        744297
when        175100000000        then        744299
when        150000000000        then        744141
when        150000150000        then        744143
when        150000250000        then        744145
when        160000000000        then        744203
when        166100000000        then        744235
when        154000000000        then        744155
when        154000700000        then        744159
when        155000000000        then        744177
when        170000000000        then        744243
when        170100000000        then        744245
when        257100000000        then        744400
when        270000000000        then        744454
when        270100000000        then        744456
when        250000000000        then        744352
when        250000250000        then        744356
when        255300000000        then        744394
when        250000150000        then        744354
when        260000000000        then        744414

                                ELSE NULL
                            END AS id
                        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                    )
                ) AS recurso,

at.vl_AlteracaoOrcamentaria	as valor,
		JSON_QUERY(
            (SELECT	
		 		JSON_QUERY(
            (SELECT	    
			 
			                        case  r.cd_CategoriaEconomicaReceita
   when 1112500100 then 675129
 when 1112500200 then 675130
 when 1112500300 then 675131
 when 1112500400 then 675132
 when 1112530100 then 675133
 when 1113031100 then 675134
 when 1114511101 then 675135
 when 1114511102 then 675136
 when 1114511200 then 675137
 when 1114511300 then 675138
 when 1114511400 then 675139
 when 1121010101 then 675140
 when 1121010102 then 675141
 when 1121010104 then 675142
 when 1121010105 then 675143
 when 1121010106 then 675144
 when 1121010107 then 675145
 when 1121500100 then 675146
 when 1122010101 then 675147
 when 1122010102 then 675148
 when 1122010103 then 675149
 when 1122010104 then 675150
 when 1122010105 then 675151
 when 1122010106 then 675152
 when 1122010107 then 675153
 when 1122010108 then 675154
 when 1241500100 then 675155
 when 1321010101 then 675156
 when 1321010104 then 675157
 when 1321010105 then 675158
 when 1321010106 then 675159
 when 1321010107 then 675160
 when 1321010108 then 675161
 when 1321010111 then 675162
 when 1321010112 then 675163
 when 1321010113 then 675164
 when 1321010114 then 675165
 when 1321010115 then 675166
 when 1699990101 then 675167
 when 1699990102 then 675168
 when 1711511101 then 675169
 when 1711512101 then 675170
 when 1711512102 then 675171
 when 1711520101 then 675172
 when 1712510100 then 675173
 when 1712524100 then 675174
 when 1714500100 then 675175
 when 1714520100 then 675176
 when 1714530100 then 675177
 when 1719580101 then 675178
 when 1721500101 then 675179
 when 1721510101 then 675180
 when 1721520101 then 675181
 when 1721530100 then 675182
 when 1724510101 then 675183
 when 1751500101 then 675184
 when 1751500102 then 675185
 when 1759990101 then 675186
 when 1922990100 then 675187
 when 1999992101 then 675188
 when 2422540101 then 675189
 when 1321010102 then 675190
 when 1321010110 then 675191
 when 1713501101 then 675192
 when 1713501102 then 675193
 when 1713501103 then 675194
 when 1713501104 then 675195
 when 1713502101 then 675196
 when 1713503101 then 675197
 when 1713503102 then 675198
 when 1713503103 then 675199
 when 1713504101 then 675200
 when 1713505102 then 675201
 when 1723500102 then 675202
 when 1723500103 then 675203
 when 1724500101 then 675204
 when 1321010103 then 675205
 when 1321010109 then 675206
 when 1716500101 then 675207
 when 1716500102 then 675208
 when 1716500103 then 675209
 when 1716500105 then 675210
 when 1729510101 then 675211
 when 1729510102 then 675212
 when 1729510103 then 675213
 when 1729510105 then 675214
  when 1923990404 then 678176
 when 1923990406 then 678180
 when 1923990407 then 678184
 when 1923990408 then 678189
 when 1923990409 then 678192
 when 1923990410 then 678194
 when 1923990411 then 678195
 when 1923990412 then 678198
 when 1923990413 then 678200
 when 1923990414 then 678202
 when 1923990415 then 678204
 when 1321010116 then 678206
 when 1321010117 then 678208
 when 1321010118 then 678210
 when 1321010119 then 678212
 when 1321010120 then 678214
 when 1321010121 then 678216
 when 1714990101 then 678218
 when 1714990102 then 678220
 when 1113034101 then 678222
 when 1113034102 then 678224
 when 1922011101 then 678226
 when 1923990101 then 678228
 when 1923990102 then 678230
 when 1923990103 then 678231
 when 1923990104 then 678233
 when 1923990301 then 678235
 when 1923990302 then 678237
 when 1923990303 then 678239
 when 1923990304 then 678241
 when 1923990305 then 678243
 when 1923990306 then 678245
 when 1923990307 then 678247
 when 1923990308 then 678249
 when 1923990309 then 678251
 when 1923990310 then 678253
 when 1923990311 then 678255
 when 1923990312 then 678257
 when 1923990313 then 678258
 when 1923990314 then 678260
 when 1923990315 then 678262
 when 1923990401 then 678264
 when 1923990402 then 678266
 when 1923990403 then 678268
 when 1711511104 then 678270
 when 1321010131 then 678272
 when 1321010132 then 678274
 when 2429990101 then 678276
                                    end as id

			 FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                )
            ) AS receita,
			at.vl_AlteracaoOrcamentaria	as valor

FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                )
            ) AS receitas
  FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                    )
                ) AS recursos

     FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
                ) AS origens,
			JSON_QUERY(
                (SELECT	
                    		   
			   
			JSON_QUERY(
                (
                    SELECT
                        CASE at.cd_DestinacaoRecursoDestino
                            when         155200000000       then        744181
when         155300000000       then        744183
when         156900000000       then        744185
when         157100000000       then        744189
when         159900000000       then        744201
when         170500000000       then        744251
when         170600003110       then        744255
when         170800000000       then        744261
when         175000000000       then        744297
when        175100000000        then        744299
when        150000000000        then        744141
when        150000150000        then        744143
when        150000250000        then        744145
when        160000000000        then        744203
when        166100000000        then        744235
when        154000000000        then        744155
when        154000700000        then        744159
when        155000000000        then        744177
when        170000000000        then        744243
when        170100000000        then        744245
when        257100000000        then        744400
when        270000000000        then        744455
when        270100000000        then        744457
when        257100000000        then        744401
when        270000000000        then        744455
when        270100000000        then        744457
when        250000000000        then        744353
when        250000250000        then        744357
when        255300000000        then        744395
when        250000150000        then        744355
when        260000000000         then       744415

                                ELSE NULL
                            END AS id
                        FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                    )
                ) AS recurso,
at.vl_AlteracaoOrcamentaria	as valor

  FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                    )
                ) AS recursos

FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTALTERACAOORCAMENTARIAITEM at
inner join CONTALTERACAOORCAMENTARIA a
on a. cd_Exercicio = at.cd_Exercicio
and a.cd_AlteracaoOrcamentaria = at.cd_AlteracaoOrcamentaria
inner join CONTAlteracaoOrcamentariaTipo t
on t.cd_AlteracaoOrcamentariaTipo = at.cd_AlteracaoOrcamentariaTipo
inner join CONTFICHARECEITA r
on r.cd_cecam = at.cd_Cecam
and at.CD_FichaRecOrigem = r.cd_ficharec
where t.cd_AlteracaoOrcamentariaTipo in (2)
and at.cd_Cecam = 1995
        `;
        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const content = JSON.parse(record.content);
        
            return {
                idIntegracao: record.idIntegracao ? record.idIntegracao.toString() : null,
                content: {
                    exercicio: content.exercicio || 2024,
                    validaSaldo: content.validaSaldo === "true", // Converte string para boolean
                    despesa: {
                        id: content.despesa && content.despesa.id ? content.despesa.id : null
                    },
                    valor: content.valor ? parseFloat(content.valor) : null,
                    via: content.via || "ABERTURA_CREDITO_ADICIONAL_SUPLEMENTAR",
                    finalidade: content.finalidade || null,
                    desconsideraLimite: content.desconsideraLimite === "true", // Converte string para boolean
                    tipo: content.tipo || "DESPESA",
        
                    // Tratamento de origens (verifica se é objeto ou array)
                    origens: content.origens && !Array.isArray(content.origens) 
                        ? [{
                            tipo: content.origens.tipo || "DESPESA",
                            origem: {
                                id: content.origens.origem && content.origens.origem.id ? content.origens.origem.id : null
                            },
                            valor: content.origens.valor ? parseFloat(content.origens.valor) : null,
        
                            // Tratamento de recursos dentro de origens
                            recursos: content.origens.recursos && !Array.isArray(content.origens.recursos) 
                                ? [{
                                    recurso: {
                                        id: content.origens.recursos.recurso && content.origens.recursos.recurso.id ? content.origens.recursos.recurso.id : null
                                    },
                                    valor: content.origens.recursos.valor ? parseFloat(content.origens.recursos.valor) : null,
        
                                    // Tratamento de receitas dentro de recursos
                                    receitas: content.origens.recursos.receitas && !Array.isArray(content.origens.recursos.receitas)
                                        ? [{
                                            receita: {
                                                id: content.origens.recursos.receitas.receita && content.origens.recursos.receitas.receita.id ? content.origens.recursos.receitas.receita.id : null
                                            },
                                            valor: content.origens.recursos.receitas.valor ? parseFloat(content.origens.recursos.receitas.valor) : null
                                        }]
                                        : Array.isArray(content.origens.recursos.receitas) ? content.origens.recursos.receitas.map(receita => ({
                                            receita: {
                                                id: receita.receita && receita.receita.id ? receita.receita.id : null
                                            },
                                            valor: receita.valor ? parseFloat(receita.valor) : null
                                        })) : []
                                }]
                                : []
                        }]
                        : Array.isArray(content.origens) ? content.origens.map(origem => ({
                            tipo: origem.tipo || "DESPESA",
                            origem: {
                                id: origem.origem && origem.origem.id ? origem.origem.id : null
                            },
                            valor: origem.valor ? parseFloat(origem.valor) : null,
        
                            // Tratamento de recursos dentro de origens
                            recursos: origem.recursos && !Array.isArray(origem.recursos)
                                ? [{
                                    recurso: {
                                        id: origem.recursos.recurso && origem.recursos.recurso.id ? origem.recursos.recurso.id : null
                                    },
                                    valor: origem.recursos.valor ? parseFloat(origem.recursos.valor) : null,
        
                                    // Tratamento de receitas dentro de recursos
                                    receitas: origem.recursos.receitas && !Array.isArray(origem.recursos.receitas)
                                        ? [{
                                            receita: {
                                                id: origem.recursos.receitas.receita && origem.recursos.receitas.receita.id ? origem.recursos.receitas.receita.id : null
                                            },
                                            valor: origem.recursos.receitas.valor ? parseFloat(origem.recursos.receitas.valor) : null
                                        }]
                                        : Array.isArray(origem.recursos.receitas) ? origem.recursos.receitas.map(receita => ({
                                            receita: {
                                                id: receita.receita && receita.receita.id ? receita.receita.id : null
                                            },
                                            valor: receita.valor ? parseFloat(receita.valor) : null
                                        })) : []
                                }]
                                : []
                        })) : [],
        
                    // Tratamento de recursos no nível principal
                    recursos: content.recursos && !Array.isArray(content.recursos) 
                        ? [{
                            recurso: {
                                id: content.recursos.recurso && content.recursos.recurso.id ? content.recursos.recurso.id : null
                            },
                            valor: content.recursos.valor ? parseFloat(content.recursos.valor) : null
                        }]
                        : Array.isArray(content.recursos) ? content.recursos.map(recurso => ({
                            recurso: {
                                id: recurso.recurso && recurso.recurso.id ? recurso.recurso.id : null
                            },
                            valor: recurso.valor ? parseFloat(recurso.valor) : null
                        })) : []
                }
            };
        });
        
        

        const chunkSize = 50;
        for (let i = 0; i < transformedData.length; i += chunkSize) {
            const chunk = transformedData.slice(i, i + chunkSize);
            const chunkFileName = `log_envio_${i / chunkSize + 1}.json`;
            fs.writeFileSync(chunkFileName, JSON.stringify(chunk, null, 2));
            console.log(`Dados salvos em ${chunkFileName}`);
        }
        

        // Enviar todos os registros de uma vez
         const response = await fetch('https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/creditos-orcamentarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer 1d12dec7-0720-4b34-a2e5-649610d10806'
            },
            body: JSON.stringify(transformedData)
        });

        if (response.ok) {
            const apiResponse = await response.json();

            // Gravar a resposta da API no arquivo report.json
            fs.writeFileSync('report.json', JSON.stringify(apiResponse, null, 2));
            console.log('Dados enviados com sucesso e resposta salva em report.json');
        } else {
            console.error('Erro ao enviar os dados:', response.statusText);
        }

    } catch (error) {
        console.error('Erro durante a execução do programa:', error);
    } finally {
        // Fechar a conexão com o SQL Server
        sql.close();
    }
}

main();
