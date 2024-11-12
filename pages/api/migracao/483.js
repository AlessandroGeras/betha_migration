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
a.dt_alteracaoorcamentaria,

JSON_QUERY(
(SELECT
case a.cd_Lei
 
 when 877 then 624555
 when 880 then 624556
 when 884 then 624557
 when 887 then 624558
 when 888 then 624559
 when 889 then 624560
 when 890 then 624561
 when 891 then 624562
 when 892 then 624563
 when 893 then 624564
 when 894 then 624565
 when 895 then 624566
 when 896 then 624567
 when 897 then 624568
 when 900 then 624569
 when 902 then 624570
 when 903 then 624571
 when 904 then 624572
 when 905 then 624573
 when 906 then 624574
 when 911 then 624575
 when 912 then 624576
 when 913 then 624577
 when 914 then 624578
 when 915 then 624579
 when 916 then 624580
 when 917 then 624581
 when 918 then 624582
 when 919 then 624583
 when 920 then 624584
 when 921 then 624585
 when 922 then 624586
 when 923 then 624587
 when 924 then 624588
 when 925 then 624589
 when 927 then 624590
 when 928 then 624591
 when 929 then 624592
 when 930 then 624593
 when 931 then 624594
 when 932 then 624595
 when 933 then 624596
 when 934 then 624597
 when 935 then 624598
 when 936 then 624599
 when 937 then 624600
 when 938 then 624601
 when 939 then 624602
 when 940 then 624603
 when 941 then 624604
 when 942 then 624605
 when 943 then 624606
 when 944 then 624607
 when 945 then 624608
 when 946 then 624609
 when 947 then 624610
 when 948 then 624611
 when 949 then 624612
 when 950 then 624613
 when 951 then 624614
 when 952 then 624615
 when 953 then 624616
 when 954 then 624617
 when 955 then 624618
 when 956 then 624619
 when 957 then 624620
 when 958 then 624621
 when 959 then 624622
 when 960 then 624623
 when 961 then 624624
 when 962 then 624625
 when 822 then 624626
 when 851 then 624627
 when 969 then 624628
 when 970 then 624629
 when 971 then 624630
 when 972 then 624631
 when 973 then 624632
 when 974 then 624633
 when 975 then 624634
 when 976 then 624635
 when 977 then 624636
 when 978 then 624637
 when 979 then 624638
 when 980 then 624639
 when 981 then 624640
 when 982 then 624641
 when 983 then 624642
 when 985 then 624643
 when 986 then 624644
 when 987 then 624645
 when 989 then 624646
 when 990 then 624647
 when 991 then 624648
 when 992 then 624649
 when 993 then 624650
 when 994 then 624651
 when 995 then 624652
 when 1000 then 624653
 when 1001 then 624654
 when 1002 then 624655
 when 1003 then 624656
 when 1006 then 624657
 when 1007 then 624658
 when 1008 then 624659
 when 1009 then 624660
 when 1010 then 624661
 when 1011 then 624662
 when 1012 then 624663
 when 1013 then 624664
 when 1015 then 624665
 when 1016 then 624666
 when 1017 then 624667
 when 1018 then 624668
 when 1019 then 624669
 when 1021 then 624670
 when 1022 then 624671
 when 1024 then 624672
 when 1025 then 624673
 when 1026 then 624674
 when 1027 then 624675
 when 1028 then 624676
 when 1029 then 624677
 when 1030 then 624678
 when 1031 then 624679
 when 1032 then 624680
 when 1034 then 624681
 when 1035 then 624682
 when 1036 then 624683
 when 1037 then 624684
 when 1038 then 624685
 when 1039 then 624686
 when 1040 then 624687
 when 1041 then 624688
 when 1042 then 624689
 when 1043 then 624690
 when 1044 then 624691
 when 1045 then 624692
 when 1046 then 624693
 when 1047 then 624694
 when 1048 then 624695
 when 1049 then 624696
 when 1050 then 624697
 when 1051 then 624698
 when 1052 then 624699
 when 1053 then 624700
 when 1054 then 624701
 when 1055 then 624702
 when 1056 then 624703
 when 1057 then 624704
 when 1058 then 624705
 when 1059 then 624706
 when 1061 then 624707
 when 1062 then 624708
 when 1063 then 624709
 when 1064 then 624710
 when 1065 then 624711
 when 1066 then 624712
 when 1067 then 624713
 when 1068 then 624714
 when 1069 then 624715
 when 1070 then 624716
 when 1071 then 624717
 when 1072 then 624718
 when 1073 then 624719
 when 1074 then 624720
 when 1077 then 624721
 when 1078 then 624722
 when 1079 then 624723
 when 1080 then 624724
 when 1081 then 624725
 when 1082 then 624726
 when 1083 then 624727
 when 1084 then 624728
 when 1085 then 624729
 when 1086 then 624730
 when 1087 then 624731
 when 1088 then 624732
 when 1089 then 624733
 when 1090 then 624734
 when 1091 then 624735
 when 1092 then 624736
 when 1093 then 624737
 when 1094 then 624738
 when 1095 then 624739
 when 1096 then 624740
 when 1097 then 624741
 when 1099 then 624742
 when 1101 then 624743
 when 1102 then 624744
 when 1104 then 624745
 when 1105 then 624746
 when 1106 then 624747
 when 1107 then 624748
 when 1108 then 624749
 when 1109 then 624750
 when 1110 then 624751
 when 1111 then 624752
 when 1112 then 624753
 when 1113 then 624754
 when 1114 then 624755
 when 1115 then 624756
 when 1117 then 624757
 when 1118 then 624758
 when 1119 then 624759
 when 1120 then 624760
 when 1121 then 624761
 when 1122 then 624762
 when 1123 then 624763
 when 1124 then 624764
 when 1125 then 624765
 when 1126 then 624766
 when 1127 then 624767
 when 1128 then 624768
 when 1129 then 624769
 when 1130 then 624770
 when 1131 then 624771
 when 1132 then 624772
 when 1133 then 624773
 when 1137 then 624774
 when 1138 then 624775
 when 1139 then 624776
 when 1140 then 624777
 when 1141 then 624778
 when 1142 then 624779
 when 1143 then 624780
 when 1144 then 624781
 when 1145 then 624782
 when 1146 then 624783
 when 1147 then 624784
 when 1148 then 624785
 when 1149 then 624786
 when 1150 then 624787
 when 1151 then 624788
 when 1152 then 624789
 when 1153 then 624790
 when 1154 then 624791
 when 1155 then 624792
 when 1156 then 624793
 when 1157 then 624794
 when 1158 then 624795
 when 1161 then 624796
 when 1162 then 624797
 when 1163 then 624798
 when 672 then 624799
 when 583 then 624800
 when 584 then 624801
 when 585 then 624802
 when 589 then 624803
 when 590 then 624804
 when 591 then 624805
 when 592 then 624806
 when 593 then 624807
 when 594 then 624808
 when 595 then 624809
 when 596 then 624810
 when 597 then 624811
 when 599 then 624812
 when 600 then 624813
 when 601 then 624814
 when 602 then 624815
 when 603 then 624816
 when 604 then 624817
 when 605 then 624818
 when 606 then 624819
 when 607 then 624820
 when 608 then 624821
 when 609 then 624822
 when 610 then 624823
 when 611 then 624824
 when 612 then 624825
 when 613 then 624826
 when 614 then 624827
 when 615 then 624828
 when 616 then 624829
 when 617 then 624830
 when 620 then 624831
 when 621 then 624832
 when 622 then 624833
 when 624 then 624834
 when 625 then 624835
 when 626 then 624836
 when 627 then 624837
 when 628 then 624838
 when 629 then 624839
 when 630 then 624840
 when 631 then 624841
 when 632 then 624842
 when 633 then 624843
 when 634 then 624844
 when 635 then 624845
 when 636 then 624846
 when 637 then 624847
 when 638 then 624848
 when 639 then 624849
 when 640 then 624850
 when 641 then 624851
 when 642 then 624852
 when 643 then 624853
 when 644 then 624854
 when 645 then 624855
 when 646 then 624856
 when 647 then 624857
 when 648 then 624858
 when 651 then 624859
 when 652 then 624860
 when 653 then 624861
 when 654 then 624862
 when 656 then 624863
 when 657 then 624864
 when 659 then 624865
 when 660 then 624866
 when 661 then 624867
 when 665 then 624868
 when 666 then 624869
 when 667 then 624870
 when 668 then 624871
 when 669 then 624872
 when 670 then 624873
 when 671 then 624874
 when 672 then 624875
 when 673 then 624876
 when 674 then 624877
 when 678 then 624878
 when 679 then 624879
 when 680 then 624880
 when 681 then 624881
 when 682 then 624882
 when 683 then 624883
 when 684 then 624884
 when 685 then 624885
 when 686 then 624886
 when 687 then 624887
 when 688 then 624888
 when 689 then 624889
 when 690 then 624890
 when 691 then 624891
 when 697 then 624892
 when 698 then 624893
 when 699 then 624894
 when 700 then 624895
 when 701 then 624896
 when 702 then 624897
 when 703 then 624898
 when 704 then 624899
 when 705 then 624900
 when 706 then 624901
 when 707 then 624902
 when 708 then 624903
 when 710 then 624904
 when 711 then 624905
 when 712 then 624906
 when 715 then 624907
 when 717 then 624908
 when 721 then 624909
 when 722 then 624910
 when 723 then 624911
 when 724 then 624912
 when 725 then 624913
 when 726 then 624914
 when 727 then 624915
 when 728 then 624916
 when 729 then 624917
 when 730 then 624918
 when 731 then 624919
 when 733 then 624920
 when 734 then 624921
 when 736 then 624922
 when 737 then 624923
 when 738 then 624924
 when 739 then 624925
 when 740 then 624926
 when 1060 then 624928
 when 2015 then 627159
 when 2022 then 627160

 


 ELSE NULL
 end  as id
  FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                    )
                ) AS atoAutorizativo,
				JSON_QUERY(
(SELECT
 
 case a.cd_AlteracaoOrcamentaria
 
   when 877 then 624555
 when 880 then 624556
 when 884 then 624557
 when 887 then 624558
 when 888 then 624559
 when 889 then 624560
 when 890 then 624561
 when 891 then 624562
 when 892 then 624563
 when 893 then 624564
 when 894 then 624565
 when 895 then 624566
 when 896 then 624567
 when 897 then 624568
 when 900 then 624569
 when 902 then 624570
 when 903 then 624571
 when 904 then 624572
 when 905 then 624573
 when 906 then 624574
 when 911 then 624575
 when 912 then 624576
 when 913 then 624577
 when 914 then 624578
 when 915 then 624579
 when 916 then 624580
 when 917 then 624581
 when 918 then 624582
 when 919 then 624583
 when 920 then 624584
 when 921 then 624585
 when 922 then 624586
 when 923 then 624587
 when 924 then 624588
 when 925 then 624589
 when 927 then 624590
 when 928 then 624591
 when 929 then 624592
 when 930 then 624593
 when 931 then 624594
 when 932 then 624595
 when 933 then 624596
 when 934 then 624597
 when 935 then 624598
 when 936 then 624599
 when 937 then 624600
 when 938 then 624601
 when 939 then 624602
 when 940 then 624603
 when 941 then 624604
 when 942 then 624605
 when 943 then 624606
 when 944 then 624607
 when 945 then 624608
 when 946 then 624609
 when 947 then 624610
 when 948 then 624611
 when 949 then 624612
 when 950 then 624613
 when 951 then 624614
 when 952 then 624615
 when 953 then 624616
 when 954 then 624617
 when 955 then 624618
 when 956 then 624619
 when 957 then 624620
 when 958 then 624621
 when 959 then 624622
 when 960 then 624623
 when 961 then 624624
 when 962 then 624625
 when 822 then 624626
 when 851 then 624627
 when 969 then 624628
 when 970 then 624629
 when 971 then 624630
 when 972 then 624631
 when 973 then 624632
 when 974 then 624633
 when 975 then 624634
 when 976 then 624635
 when 977 then 624636
 when 978 then 624637
 when 979 then 624638
 when 980 then 624639
 when 981 then 624640
 when 982 then 624641
 when 983 then 624642
 when 985 then 624643
 when 986 then 624644
 when 987 then 624645
 when 989 then 624646
 when 990 then 624647
 when 991 then 624648
 when 992 then 624649
 when 993 then 624650
 when 994 then 624651
 when 995 then 624652
 when 1000 then 624653
 when 1001 then 624654
 when 1002 then 624655
 when 1003 then 624656
 when 1006 then 624657
 when 1007 then 624658
 when 1008 then 624659
 when 1009 then 624660
 when 1010 then 624661
 when 1011 then 624662
 when 1012 then 624663
 when 1013 then 624664
 when 1015 then 624665
 when 1016 then 624666
 when 1017 then 624667
 when 1018 then 624668
 when 1019 then 624669
 when 1021 then 624670
 when 1022 then 624671
 when 1024 then 624672
 when 1025 then 624673
 when 1026 then 624674
 when 1027 then 624675
 when 1028 then 624676
 when 1029 then 624677
 when 1030 then 624678
 when 1031 then 624679
 when 1032 then 624680
 when 1034 then 624681
 when 1035 then 624682
 when 1036 then 624683
 when 1037 then 624684
 when 1038 then 624685
 when 1039 then 624686
 when 1040 then 624687
 when 1041 then 624688
 when 1042 then 624689
 when 1043 then 624690
 when 1044 then 624691
 when 1045 then 624692
 when 1046 then 624693
 when 1047 then 624694
 when 1048 then 624695
 when 1049 then 624696
 when 1050 then 624697
 when 1051 then 624698
 when 1052 then 624699
 when 1053 then 624700
 when 1054 then 624701
 when 1055 then 624702
 when 1056 then 624703
 when 1057 then 624704
 when 1058 then 624705
 when 1059 then 624706
 when 1061 then 624707
 when 1062 then 624708
 when 1063 then 624709
 when 1064 then 624710
 when 1065 then 624711
 when 1066 then 624712
 when 1067 then 624713
 when 1068 then 624714
 when 1069 then 624715
 when 1070 then 624716
 when 1071 then 624717
 when 1072 then 624718
 when 1073 then 624719
 when 1074 then 624720
 when 1077 then 624721
 when 1078 then 624722
 when 1079 then 624723
 when 1080 then 624724
 when 1081 then 624725
 when 1082 then 624726
 when 1083 then 624727
 when 1084 then 624728
 when 1085 then 624729
 when 1086 then 624730
 when 1087 then 624731
 when 1088 then 624732
 when 1089 then 624733
 when 1090 then 624734
 when 1091 then 624735
 when 1092 then 624736
 when 1093 then 624737
 when 1094 then 624738
 when 1095 then 624739
 when 1096 then 624740
 when 1097 then 624741
 when 1099 then 624742
 when 1101 then 624743
 when 1102 then 624744
 when 1104 then 624745
 when 1105 then 624746
 when 1106 then 624747
 when 1107 then 624748
 when 1108 then 624749
 when 1109 then 624750
 when 1110 then 624751
 when 1111 then 624752
 when 1112 then 624753
 when 1113 then 624754
 when 1114 then 624755
 when 1115 then 624756
 when 1117 then 624757
 when 1118 then 624758
 when 1119 then 624759
 when 1120 then 624760
 when 1121 then 624761
 when 1122 then 624762
 when 1123 then 624763
 when 1124 then 624764
 when 1125 then 624765
 when 1126 then 624766
 when 1127 then 624767
 when 1128 then 624768
 when 1129 then 624769
 when 1130 then 624770
 when 1131 then 624771
 when 1132 then 624772
 when 1133 then 624773
 when 1137 then 624774
 when 1138 then 624775
 when 1139 then 624776
 when 1140 then 624777
 when 1141 then 624778
 when 1142 then 624779
 when 1143 then 624780
 when 1144 then 624781
 when 1145 then 624782
 when 1146 then 624783
 when 1147 then 624784
 when 1148 then 624785
 when 1149 then 624786
 when 1150 then 624787
 when 1151 then 624788
 when 1152 then 624789
 when 1153 then 624790
 when 1154 then 624791
 when 1155 then 624792
 when 1156 then 624793
 when 1157 then 624794
 when 1158 then 624795
 when 1161 then 624796
 when 1162 then 624797
 when 1163 then 624798
 when 672 then 624799
 when 583 then 624800
 when 584 then 624801
 when 585 then 624802
 when 589 then 624803
 when 590 then 624804
 when 591 then 624805
 when 592 then 624806
 when 593 then 624807
 when 594 then 624808
 when 595 then 624809
 when 596 then 624810
 when 597 then 624811
 when 599 then 624812
 when 600 then 624813
 when 601 then 624814
 when 602 then 624815
 when 603 then 624816
 when 604 then 624817
 when 605 then 624818
 when 606 then 624819
 when 607 then 624820
 when 608 then 624821
 when 609 then 624822
 when 610 then 624823
 when 611 then 624824
 when 612 then 624825
 when 613 then 624826
 when 614 then 624827
 when 615 then 624828
 when 616 then 624829
 when 617 then 624830
 when 620 then 624831
 when 621 then 624832
 when 622 then 624833
 when 624 then 624834
 when 625 then 624835
 when 626 then 624836
 when 627 then 624837
 when 628 then 624838
 when 629 then 624839
 when 630 then 624840
 when 631 then 624841
 when 632 then 624842
 when 633 then 624843
 when 634 then 624844
 when 635 then 624845
 when 636 then 624846
 when 637 then 624847
 when 638 then 624848
 when 639 then 624849
 when 640 then 624850
 when 641 then 624851
 when 642 then 624852
 when 643 then 624853
 when 644 then 624854
 when 645 then 624855
 when 646 then 624856
 when 647 then 624857
 when 648 then 624858
 when 651 then 624859
 when 652 then 624860
 when 653 then 624861
 when 654 then 624862
 when 656 then 624863
 when 657 then 624864
 when 659 then 624865
 when 660 then 624866
 when 661 then 624867
 when 665 then 624868
 when 666 then 624869
 when 667 then 624870
 when 668 then 624871
 when 669 then 624872
 when 670 then 624873
 when 671 then 624874
 when 672 then 624875
 when 673 then 624876
 when 674 then 624877
 when 678 then 624878
 when 679 then 624879
 when 680 then 624880
 when 681 then 624881
 when 682 then 624882
 when 683 then 624883
 when 684 then 624884
 when 685 then 624885
 when 686 then 624886
 when 687 then 624887
 when 688 then 624888
 when 689 then 624889
 when 690 then 624890
 when 691 then 624891
 when 697 then 624892
 when 698 then 624893
 when 699 then 624894
 when 700 then 624895
 when 701 then 624896
 when 702 then 624897
 when 703 then 624898
 when 704 then 624899
 when 705 then 624900
 when 706 then 624901
 when 707 then 624902
 when 708 then 624903
 when 710 then 624904
 when 711 then 624905
 when 712 then 624906
 when 715 then 624907
 when 717 then 624908
 when 721 then 624909
 when 722 then 624910
 when 723 then 624911
 when 724 then 624912
 when 725 then 624913
 when 726 then 624914
 when 727 then 624915
 when 728 then 624916
 when 729 then 624917
 when 730 then 624918
 when 731 then 624919
 when 733 then 624920
 when 734 then 624921
 when 736 then 624922
 when 737 then 624923
 when 738 then 624924
 when 739 then 624925
 when 740 then 624926
 when 1060 then 624928
 when 2015 then 627159
 when 2022 then 627160

 

 ELSE NULL
 end  as id
  FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                    )
                ) AS atoAbertura,

				JSON_QUERY(
(SELECT
 case at.vl_AlteracaoOrcamentaria
 when 26800.74 then 1376609
 when 20000 then 1376610
 when 20000 then 1376611
 when 30078.35 then 1376612
 when 2000 then 1376613
 when 7000 then 1376614
 when 23000 then 1376615
 when 10000 then 1376616
 when 87039.58 then 1376617
 when 141959.91 then 1376618
 when 418.61 then 1376619
 when 2000 then 1376620
 when 15000 then 1376621
 when 15000 then 1376622
 when 20760.83 then 1376623
 when 10000 then 1376624
 when 8000 then 1376625
 when 3483.35 then 1376626
 when 20000 then 1376627
 when 6419.65 then 1376628
 when 34000 then 1376629
 when 100000 then 1376630
 when 10500 then 1376631
 when 20000 then 1376632
 when 100000 then 1376633
 when 48000 then 1376634
 when 1500 then 1376635
 when 4000 then 1376636
 when 9000 then 1376637
 when 9000 then 1376638
 when 5547.59 then 1376639
 when 28938.68 then 1376640
 when 5000 then 1376641
 when 21000 then 1376642
 when 15000 then 1376643
 when 25200 then 1376644
 when 15500 then 1376645
 when 3000 then 1376646
 when 16000 then 1376647
 when 3000 then 1376648
 when 17000 then 1376649
 when 16000 then 1376650
 when 5000 then 1376651
 when 65000 then 1376652
 when 25000 then 1376653
 when 14327.18 then 1376654
 when 138000 then 1376655
 when 32000 then 1376656
 when 34000 then 1376657
 when 16000 then 1376658
 when 247.14 then 1376659
 when 5000 then 1376660
 when 53061.54 then 1376661
 when 600 then 1376662
 when 25500 then 1376663
 when 5000 then 1376664
 when 2000 then 1376665
 when 398.5 then 1376666
 when 8000 then 1376667
 when 1000 then 1376668
 when 6550 then 1376669
 when 4850 then 1376670
 when 500 then 1376671
 when 1000 then 1376672
 when 1000 then 1376673
 when 1000 then 1376674
 when 3000 then 1376675
 when 3000 then 1376676
 when 9000 then 1376677
 when 4000 then 1376678
 when 35000 then 1376679
 when 5000 then 1376680
 when 2000 then 1376681
 when 25048.56 then 1376682
 when 7000 then 1376683
 when 13877.03 then 1376770
 when 1196.03 then 1376771
 when 750.8 then 1376772
 when 1428.9 then 1376773
 when 6464.13 then 1376774
 when 9845.43 then 1376775
 when 1938.57 then 1376776
 when 10080.68 then 1376777
 when 30000 then 1376778
 when 700000 then 1376779
 when 161000 then 1376780
 when 39000 then 1376781
 when 150000 then 1376782
 when 40000 then 1376783
 when 10000 then 1376784
 when 3000 then 1376785
 when 60000 then 1376786
 when 90000 then 1376787
 when 10000 then 1376788
 when 180000 then 1376789
 when 160000 then 1376790
 when 10000 then 1376791
 when 25000 then 1376792
 when 15000 then 1376793
 when 10000 then 1376794
 when 60000 then 1376795
 when 85000 then 1376796
 when 25000 then 1376797
 when 2729.98 then 1376798
 when 511.19 then 1376799
 when 62501.12 then 1376800
 when 15759.56 then 1376801
 when 509213.97 then 1376802
 when 636733.83 then 1376803
 when 100000 then 1376804
 when 1000000 then 1376805
 when 398101.5 then 1376806
 when 335403.58 then 1376819
 when 101135.34 then 1376820
 when 94639.95 then 1376821
 when 141959.91 then 1376822
 when 160551.14 then 1376823
 when 125375.6 then 1376824
 when 187931.54 then 1376825
 when 6438.67 then 1376826
 when 35186.52 then 1376827
 when 40742.62 then 1376828
 when 762.71 then 1376829
 when 69874.3 then 1376830
 when 200000 then 1376831
 when 29874.02 then 1376832
 when 207628.18 then 1376833
 when 80000 then 1376834
 when 25000 then 1376835
 when 70000 then 1376836
 when 166000 then 1376837
 when 66000 then 1376838
 when 1000 then 1376839
 when 40000 then 1376840
 when 18000 then 1376841
 when 16000 then 1376842
 when 58000 then 1376843
 when 170000 then 1376844
 when 345000 then 1376845
 when 104000 then 1376846
 when 10000 then 1376847
 when 150000 then 1376848
 when 360000 then 1376849
 when 50000 then 1376850
 when 40000 then 1376851
 when 1000 then 1376852
 when 60000 then 1376853
 when 20000 then 1376854
 when 50000 then 1376855
 when 330000 then 1376856
 when 325000 then 1376857
 when 45000 then 1376858
 when 25000 then 1376859
 when 200000 then 1376860
 when 150000 then 1376861
 when 2000 then 1376862
 when 10000 then 1376863
 when 40000 then 1376864
 when 210000 then 1376865
 when 10000 then 1376866
 when 19000 then 1376867
 when 2000 then 1376868
 when 10000 then 1376869
 when 100000 then 1376870
 when 50000 then 1376871
 when 25000 then 1376872
 when 30000 then 1376873
 when 4000 then 1376874
 when 14000 then 1376875
 when 529799.56 then 1376876
 when 58999.81 then 1376877
 when 199000 then 1376878
 when 601462 then 1376879
 when 50667.69 then 1376880
 when 32872.97 then 1376881
 when 14088.41 then 1376882
 when 6505.49 then 1376883
 when 66922.74 then 1376884
 when 241441 then 1376885
 when 100000 then 1376886
 when 216000 then 1376887
 when 235021.92 then 1376888
 when 75669.43 then 1376889

 ELSE NULL
 end  as id
  FOR JSON PATH, WITHOUT_ARRAY_WRAPPER
                    )
                ) AS creditos
FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)
) AS content
from CONTALTERACAOORCAMENTARIAITEM at
inner join CONTALTERACAOORCAMENTARIA a
on a. cd_Exercicio = at.cd_Exercicio
and a.cd_AlteracaoOrcamentaria = at.cd_AlteracaoOrcamentaria
inner join CONTAlteracaoOrcamentariaTipo t
on t.cd_AlteracaoOrcamentariaTipo = at.cd_AlteracaoOrcamentariaTipo
where t.cd_AlteracaoOrcamentariaTipo in (1,2,3)
and at.cd_Cecam = 1995






--

        `;
        const result = await masterConnection.query(userQuery);
        const resultData = result.recordset;

        // Transformar os resultados da consulta no formato desejado
        const transformedData = resultData.map(record => {
            const content = JSON.parse(record.content);
        
            return {
                idIntegracao: record.idIntegracao ? record.idIntegracao.toString() : null,
                content: {
                    exercicio: content.exercicio || null,
                    dataSancao: formatDate(content.dt_alteracaoorcamentaria) || null,
                    atoAutorizativo: {
                        id: content.atoAutorizativo && content.atoAutorizativo.id ? content.atoAutorizativo.id : null
                    },
                    atoAbertura: {
                        id: content.atoAbertura && content.atoAbertura.id ? content.atoAbertura.id : null
                    },
                    creditos: Array.isArray(content.creditos)
                        ? content.creditos.map(credito => ({ id: credito.id }))
                        : [{ id: content.creditos.id }]
                }
            };
        });         
        
/* 
         const chunkSize = 50;
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
        
                const response = await fetch(`https://con-sl-rest.betha.cloud/contabil/service-layer/v2/api/creditos-orcamentarios-sancoes`, {
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