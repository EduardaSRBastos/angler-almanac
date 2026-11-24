const EQUIP_LINKS = {
  decathlon: {
    conjuntoUFish240:
      "https://www.decathlon.pt/p/conjunto-de-descoberta-da-pesca-u-fish-2-40/350584/m8843245",
    mono022a028:
      "https://www.decathlon.pt/search?Ntt=Monofilamento&facets=attributes.svt395:Poliamida_attributes.svt395:Nylon_attributes.sizeGroupItemLabels:22%2F100_attributes.sizeGroupItemLabels:23%2F100_attributes.sizeGroupItemLabels:23.5%2F100_attributes.sizeGroupItemLabels:25%2F100_attributes.sizeGroupItemLabels:26%2F100_attributes.sizeGroupItemLabels:28%2F100_attributes.sizeGroupItemLabels:0.22%2F100_attributes.sizeGroupItemLabels:0.25%2F100_attributes.sizeGroupItemLabels:0.28%2F100_",
    multi010a014:
      "https://www.decathlon.pt/search?Ntt=Multifilamento&facets=attributes.sizeGroupItemLabels:14%2F100_attributes.sizeGroupItemLabels:0.14%20-%200.37%20mm_attributes.sizeGroupItemLabels:0.14%2F100_attributes.sizeGroupItemLabels:0.10%2F100_attributes.sizeGroupItemLabels:12%2F100_attributes.sizeGroupItemLabels:13%2F100_attributes.sizeGroupItemLabels:10%2F100_",
    fluoro022a026:
      "https://www.decathlon.pt/search?Ntt=Fluorocarbono&facets=attributes.sizeGroupItemLabels:0.24%2F100_attributes.sizeGroupItemLabels:23.5%2F100_attributes.sizeGroupItemLabels:0.23%2F100_attributes.sizeGroupItemLabels:22%2F100_attributes.sizeGroupItemLabels:0.26%2F100_attributes.sizeGroupItemLabels:25%2F100_attributes.sizeGroupItemLabels:0.22%2F100_attributes.sizeGroupItemLabels:26%2F100_attributes.commercialProductNatureLabel:Linha_attributes.commercialProductNatureLabel:Estralho_",
    anzois4a10:
      "https://www.decathlon.pt/search?Ntt=Anzol&facets=attributes.commercialProductNatureLabel:Estralho_attributes.commercialProductNatureLabel:Anzol_attributes.commercialProductNatureLabel:Anzol%20montado_attributes.sizeGroupItemLabels:4_attributes.sizeGroupItemLabels:6_attributes.sizeGroupItemLabels:8_attributes.sizeGroupItemLabels:10_",
    chumbadas10a25:
      "https://www.decathlon.pt/todos-os-desportos/pesca/chumbos-chumbadas-pesca?facets=attributes.sizeGroupItemLabels:10%20g_attributes.sizeGroupItemLabels:10g_attributes.sizeGroupItemLabels:15%20g_attributes.sizeGroupItemLabels:15g_attributes.sizeGroupItemLabels:20%20g_attributes.sizeGroupItemLabels:20g_attributes.sizeGroupItemLabels:25%20g_attributes.sizeGroupItemLabels:25g_",
    boias8a20:
      "https://www.decathlon.pt/todos-os-desportos/pesca/boias-flutuadores-pesca?facets=attributes.sizeGroupItemLabels:8%20g_attributes.sizeGroupItemLabels:8g_attributes.sizeGroupItemLabels:10%20g_attributes.sizeGroupItemLabels:10g_attributes.sizeGroupItemLabels:12%20g_attributes.sizeGroupItemLabels:12g_attributes.sizeGroupItemLabels:15%20g_attributes.sizeGroupItemLabels:15g_attributes.sizeGroupItemLabels:20%20g_attributes.sizeGroupItemLabels:20g_",
    minnow7a9:
      "https://www.decathlon.pt/search?Ntt=minnow&facets=attributes.svt609:9%20cm_attributes.svt609:8%20cm_attributes.svt609:7%2C5%20cm_attributes.svt609:7%20cm_",
    vinis7a15:
      "https://www.decathlon.pt/search?Ntt=vinis+shads&facets=attributes.svt589:15%20g_attributes.svt589:14g%20-%201%2F2oz_attributes.svt589:13%20g_attributes.svt589:12%20g_attributes.svt589:11%20g_attributes.svt589:10%20g_attributes.svt589:9%20g_attributes.svt589:8%20g_",
    colheresOndulantes:
      "https://www.decathlon.pt/todos-os-desportos/pesca/colheres-ondulantes-leves-pesca",
    toneiras25a30:
      "https://www.decathlon.pt/todos-os-desportos/pesca/palhacos-toneiras-amostras-cefalopodes-pesca?facets=attributes.sizeGroupItemLabels:2.5_attributes.sizeGroupItemLabels:%232.5_attributes.sizeGroupItemLabels:2%2C5_attributes.sizeGroupItemLabels:3_attributes.sizeGroupItemLabels:3.0_attributes.sizeGroupItemLabels:%233.0_attributes.sizeGroupItemLabels:3%2C0_",
    xalavarPRF240:
      "https://www.decathlon.pt/p/xalavar-de-pesca-prf-4x4-240/311286/m8556267",
    montagensProntas:
      "https://www.decathlon.pt/todos-os-desportos/pesca-no-mar/montagens-prontas-chicotadas-pesca-no-mar",
  },
  tutoriais: {
    noUniDuplo: "https://www.animatedknots.com/uni-knot",
    noPalomar: "https://www.animatedknots.com/palomar-knot",
    noAlbright: "https://www.youtube.com/watch?v=Fhn7Zd1Wxdw",
    noDeCorrer: "https://www.animatedknots.com/stopper-loop-knot",
    guiaNosPT: "https://pescaportugal.pt/tecnicas/nos-de-pesca",
  },
};

function equipLink(url, label) {
  return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="cana-inline-link">${label}</a>`;
}
