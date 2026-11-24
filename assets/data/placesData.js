// Formato: "# tipo de água | local" abre um grupo; cada linha seguinte é uma espécie:
// peixe | época | horário | maré/corrente | isco | amostra | preferência | técnica | movimento | tam. mín. (cm) | hipóteses
const PLACES_DATA = {
  aveiro: `
# Salobra | Cais da Tijosa / Canal de Ovar (Ovar)
Robalo|Out-Dez e Mar-Abr|Amanhecer / entardecer|Maré a subir ou a descer|Camarão, sardinha|Minnow, vinil|Natural / artificial|Spinning ou pesca ao fundo|Recolha lenta junto às margens|36|Baixa
Tainha|Mai-Out|Durante o dia|Corrente moderada|Pão, larvas de mosca|—|Natural|Pesca à bóia|Engodar pouco e deixar derivar|20|Baixa
# Salobra | Cais do Carregal (Ovar)
Robalo|Out-Dez e Mar-Abr|Amanhecer / noite|Maré a subir ou a descer|Camarão, sardinha|Vinil, minnow|Natural / artificial|Spinning ou pesca ao fundo|Recolha lenta junto às margens|36|Baixa
Tainha|Mai-Out|Durante o dia|Corrente moderada|Pão, larvas de mosca|—|Natural|Pesca à bóia|Engodar pouco e deixar derivar|20|Baixa
# Salobra | Cais da Cova do Chegado (Ovar)
Robalo|Out-Dez e Mar-Abr|Amanhecer / entardecer|Perto da maré-cheia ou maré-vazia|Camarão, sardinha|Minnow, vinil|Natural / artificial|Spinning ou pesca ao fundo|Recolha lenta|36|Baixa
# Salobra | Cais do Torrão (Válega, Ovar)
Robalo|Out-Dez e Mar-Abr|Amanhecer / entardecer|Maré a subir ou a descer|Camarão, sardinha|Minnow, vinil|Natural / artificial|Spinning ou pesca ao fundo|Recolha lenta|36|Baixa
Dourada|Mai-Out|Manhã / fim da tarde|Maré a subir|Caranguejo, berbigão|—|Natural|Pesca ao fundo com chumbo|Isco quieto no fundo|19|Baixa
# Mar / praia | Praia do Furadouro (Ovar)
Robalo|Out-Dez e Mar-Abr|Amanhecer / noite|Maré a subir|Casulo, minhoca-da-lama, sardinha|Minnow, vinil|Natural / artificial|Surfcasting ou spinning|Recolha lenta|36|Baixa
Baila|Out-Mar|Amanhecer / noite|Maré a subir|Casulo, minhoca-da-lama, camarão|—|Natural|Surfcasting|Fundo, com pequenas pausas|20|Baixa
Dourada|Mai-Nov|Fim da tarde / noite|Maré a subir ou a descer|Caranguejo, amêijoa, lula|—|Natural|Surfcasting|Isco parado no fundo|19|Baixa a média
# Salobra | Cais da Ribeira da Aldeia (Pardilhó, Estarreja)
Robalo|Out-Dez e Mar-Abr|Amanhecer / entardecer|Maré a subir ou a descer|Camarão, sardinha|Minnow, vinil|Natural / artificial|Spinning ou pesca ao fundo|Recolher com pausas|36|Baixa a média
Tainha|Mai-Out|Durante o dia|Sem preferência definida|Pão, larvas de mosca|—|Natural|Pesca à bóia|Deriva natural|20|Baixa a média
# Salobra | Cais da Ribeira do Mourão (Bunheiro, Murtosa)
Robalo|Out-Dez e Mar-Abr|Amanhecer / entardecer|Perto da maré-cheia ou maré-vazia|Camarão, sardinha|Vinil|Natural / artificial|Spinning ou pesca ao fundo|Recolha lenta|36|Baixa a média
Tainha|Mai-Out|Durante o dia|Sem preferência definida|Pão, massa|—|Natural|Pesca à bóia|Engodar pouco e deixar derivar|20|Baixa a média
# Salobra | Cais da Ribeira de Pardelhas (Murtosa)
Robalo|Out-Dez e Mar-Abr|Amanhecer / entardecer|Perto da maré-cheia ou maré-vazia|Camarão, sardinha|Vinil, minnow|Natural / artificial|Spinning ou pesca ao fundo|Recolher lentamente|36|Baixa a média
# Salobra | Cais do Bico (Murtosa)
Robalo|Out-Dez e Mar-Abr|Amanhecer / entardecer|Maré a subir ou a descer|Camarão, sardinha|Vinil 7-12 cm, minnow|Natural / artificial|Spinning ou pesca ao fundo|Pausas e recolha lenta|36|Baixa a média
Dourada|Mai-Out|Manhã / fim da tarde|Maré a subir|Caranguejo, berbigão|—|Natural|Pesca ao fundo com chumbo|Isco parado|19|Baixa a média
Tainha|Mai-Out|Durante o dia|Sem preferência definida|Pão, larvas de mosca|—|Natural|Pesca à bóia|Deriva natural|20|Baixa a média
Besugo / Alcorraz|Mai-Out|Durante o dia / fim da tarde|Maré a subir|Camarão, berbigão, minhoca-da-lama|—|Natural|Pesca ao fundo ou bóia|Isco parado ou deriva lenta|18/14|Baixa a média
Linguado|Nov-Mar|Fim da tarde / noite|Maré a subir ou a descer|Minhoca-da-lama, lula, camarão|—|Natural|Pesca ao fundo com chumbo|Junto ao substrato, com pequenas deslocações|24|Baixa a média
Solha-da-pedra|Nov-Mar|Fim da tarde / noite|Maré a subir ou a descer|Minhoca-da-lama, lula, camarão|—|Natural|Pesca ao fundo com chumbo|Manter o isco junto ao fundo|22|Baixa a média
Choco|Out-Abr|Fim da tarde / noite|Maré parada ou início de enchente|—|Palhaço (toneira)|Artificial|Eging / pesca ao fundo|Toques lentos junto ao fundo|10|Baixa a média
# Salobra | Ponte da Varela (Torreira, Murtosa)
Robalo|Out-Dez e Mar-Abr|Amanhecer / pôr do sol|Maré a subir ou mudança de maré|Camarão, sardinha, minhoca-da-lama|Minnow, vinil|Natural / artificial|Spinning ou pesca ao fundo|Recolha lenta, com pausas|36|Baixa a média
Dourada|Mai-Out|Manhã / fim da tarde|Maré a subir|Caranguejo, berbigão|—|Natural|Pesca ao fundo com chumbo|Deixar o isco assentar no fundo|19|Baixa a média
Tainha|Mai-Out|Durante o dia|Sem preferência definida|Pão, massa, larvas de mosca|—|Natural|Pesca à bóia|Deixar derivar naturalmente|20|Baixa a média
Besugo / Alcorraz|Mai-Out|Manhã / fim da tarde|Maré a subir|Camarão, berbigão|—|Natural|Pesca ao fundo ou bóia|Isco parado ou deriva lenta|18/14|Baixa a média
# Salobra | Cais da Béstida (Torreira, Murtosa)
Robalo|Out-Dez e Mar-Abr|Amanhecer / entardecer|Maré a subir ou mudança de maré|Camarão, sardinha|Minnow, vinil|Natural / artificial|Spinning ou pesca ao fundo|Recolha lenta, com pausas|36|Baixa a média
Tainha|Mai-Out|Durante o dia|Sem preferência definida|Pão, larvas de mosca|—|Natural|Pesca à bóia|Engodar pouco e deixar derivar|20|Baixa a média
# Mar / praia | Praia da Torreira (Murtosa)
Robalo|Out-Dez e Mar-Abr|Amanhecer / noite|Maré a subir|Casulo, minhoca-da-lama, sardinha|Minnow, vinil|Natural / artificial|Surfcasting ou spinning|Recolha lenta junto aos canais|36|Boa
Baila|Out-Mar|Amanhecer / noite|Maré a subir|Casulo, minhoca-da-lama, camarão|—|Natural|Surfcasting|Fundo, com pequenas pausas|20|Boa
Linguado|Out-Mar|Fim da tarde / noite|Maré a subir|Minhoca-da-lama, lula, camarão|—|Natural|Surfcasting|Fundo, com pequenas deslocações|24|Boa
Dourada|Mai-Nov|Fim da tarde / noite|Maré a subir|Caranguejo, berbigão, lula|—|Natural|Surfcasting|Isco parado no fundo|19|Média
# Mar / praia | Praia de São Jacinto (Aveiro)
Robalo|Out-Dez e Mar-Abr|Amanhecer / noite|Maré a subir|Minhoca-da-lama, sardinha, camarão|Minnow, vinil|Natural / artificial|Surfcasting ou spinning|Recolha lenta, junto aos canais|36|Média
Baila|Out-Mar|Amanhecer / noite|Maré a subir|Casulo, minhoca-da-lama, camarão|—|Natural|Surfcasting|Fundo, com pequenas pausas|20|Média
Linguado|Out-Mar|Fim da tarde / noite|Maré a subir|Minhoca-da-lama, lula, camarão|—|Natural|Surfcasting|Manter o isco junto ao fundo|24|Média
# Mar / barra | Molhe de São Jacinto (Aveiro)
Robalo|Out-Dez e Mar-Abr|Amanhecer / noite|Maré a subir ou mudança de maré|Sardinha, camarão|Minnow, vinil, passeante|Natural / artificial|Spinning|Variar velocidade e profundidade|36|Média
Sargo-legítimo|Mai-Nov|Amanhecer / noite|Mar mexido, com espuma junto à costa|Camarão, mexilhão, caranguejo|—|Natural|Pesca à bóia ou ao fundo|Pescar perto das pedras, sem deixar prender|17|Média
Dourada|Mai-Nov|Manhã / fim da tarde|Maré a subir|Caranguejo, mexilhão|—|Natural|Pesca ao fundo com chumbo|Isco parado no fundo|19|Média
Safio|Out-Mar|Noite|Corrente moderada|Sardinha, cavala|—|Natural|Pesca ao fundo com chumbo|Isco grande e parado|58|Média
Cavala|Mai-Out|Amanhecer / fim da tarde|Maré a subir ou parada|Sardinha|Sabiki, colher|Artificial / natural|Spinning / bóia|Recolha rápida a meia-água|20|Média
Choco|Out-Abr|Fim da tarde / noite|Maré parada ou início de enchente|—|Palhaço (toneira)|Artificial|Eging / pesca ao fundo|Toques lentos junto ao fundo|10|Média
# Mar / barra | Quebramar Norte da Barra / São Jacinto (Aveiro)
Robalo|Out-Dez e Mar-Abr|Amanhecer / noite|Maré a subir ou mudança de maré|Sardinha, camarão|Minnow, vinil, passeante|Natural / artificial|Spinning com amostras artificiais|Recolha lenta|36|Média
Sargo-legítimo|Mai-Nov|Amanhecer / noite|Mar mexido|Camarão, mexilhão|—|Natural|Pesca à bóia ou ao fundo|Pescar junto às pedras e zonas de espuma|17|Média
Dourada|Mai-Nov|Manhã / fim da tarde|Maré a subir|Caranguejo, mexilhão|—|Natural|Pesca ao fundo com chumbo|Isco parado|19|Média
# Mar / barra | Quebramar Sul da Barra / Costa Nova (Ílhavo)
Robalo|Out-Dez e Mar-Abr|Amanhecer / noite|Maré a subir ou mudança de maré|Sardinha, camarão|Minnow, vinil|Natural / artificial|Spinning / bóia de correr|Recolha lenta junto às pedras|36|Boa
Sargo-legítimo|Mai-Nov|Amanhecer / noite|Mar mexido, com espuma|Camarão, mexilhão, caranguejo|—|Natural|Pesca à bóia ou ao fundo|Pescar nas zonas de espuma|17|Boa
Dourada|Mai-Nov|Manhã / fim da tarde|Maré a subir|Caranguejo, mexilhão, lula|—|Natural|Pesca ao fundo com chumbo|Isco parado no fundo|19|Boa
Cavala|Mai-Out|Amanhecer / fim da tarde|Maré a subir|Sardinha|Sabiki, colher|Artificial / natural|Corrico ligeiro / spinning|Recolha rápida à superfície / meia-água|20|Boa
Choco|Out-Abr|Fim da tarde / noite|Maré parada ou início de enchente|—|Palhaço (toneira)|Artificial|Eging / pesca ao fundo|Toques lentos junto ao fundo|10|Boa
# Mar / barra | Molhe da Meia Laranja (Praia da Barra, Ílhavo)
Robalo|Out-Dez e Mar-Abr|Amanhecer / noite|Maré a subir ou a vazar|Sardinha, camarão|Vinil, minnow|Natural / artificial|Spinning ou bóia de correr|Recolha lenta junto às pedras|36|Média
Dourada|Mai-Nov|Manhã / fim da tarde|Maré a subir|Caranguejo, mexilhão, lula|—|Natural|Pesca ao fundo com chumbo|Isco parado no fundo|19|Média
Choco|Out-Abr|Fim da tarde / noite|Maré parada ou início de enchente|—|Palhaço (toneira)|Artificial|Eging / pesca ao fundo|Toques lentos junto ao fundo|10|Média
# Mar / barra | Praia da Barra / Costa Nova (Ílhavo)
Robalo|Out-Dez e Mar-Abr|Amanhecer / noite|Maré a subir|Casulo, minhoca-da-lama, sardinha|Minnow, vinil|Natural / artificial|Surfcasting ou spinning|Recolha lenta junto aos canais|36|Média a boa
# Mar / praia | Praia da Barra / Costa Nova (Ílhavo)
Baila|Out-Mar|Amanhecer / noite|Maré a subir|Casulo, minhoca-da-lama, camarão|—|Natural|Surfcasting|Fundo, com pequenas pausas|20|Média a boa
Dourada|Mai-Nov|Fim da tarde / noite|Maré a subir|Caranguejo, berbigão, lula|—|Natural|Surfcasting|Isco parado no fundo|19|Média a boa
Sargo-legítimo|Mai-Nov|Amanhecer / noite|Mar mexido|Camarão, casulo, mexilhão|—|Natural|Surfcasting|Fundo, nas zonas de rebentação|17|Média a boa
Linguado|Out-Mar|Fim da tarde / noite|Maré a subir|Minhoca-da-lama, lula, camarão|—|Natural|Surfcasting|Fundo, com pequenas deslocações|24|Média a boa
`,
};
