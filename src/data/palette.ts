// Surface colors sampled from the supplied GLOBO 2.0 screenshot (JPEG).
// Bogotá: Manual de Marca Ciudad, actualización octubre 2024.
// SDG hues: UN SDG communications guidelines; never recolor official icons.
export const palette={background:'#0A1121',panel:'#0F1C2F',inset:'#14223C',border:'#293A50',text:'#E5EBF4',muted:'#A8B8CC',yellow:'#F9D248',red:'#E3272A',green:'#16A34A',amber:'#F59E0B',gray:'#64748B'};
export const sdgColors=['#E5243B','#DDA63A','#4C9F38','#C5192D','#FF3A21','#26BDE2','#FCC30B','#A21942','#FD6925','#DD1367','#FD9D24','#BF8B2E','#3F7E44','#0A97D9','#56C02B','#00689D','#19486A'];
// Stable categorical colors: city accents and neutral UI shades, not SDG attribution.
export const sectorColors:Record<string,string>={'Ambiente':'#6B86A6','Cultura':'#94A3B8','Educación':palette.yellow,'Integración Social':palette.red,'Salud':'#CBD5E1'};
