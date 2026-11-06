import {geoNaturalEarth1,geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import world from 'world-atlas/countries-110m.json';
import type {Topology,GeometryCollection} from 'topojson-specification';
import {partners} from '../data/cooperation';
const topology=world as unknown as Topology<{countries:GeometryCollection}>;
const allCountries=feature(topology,topology.objects.countries);
const countries={...allCountries,features:allCountries.features.filter(f=>Number(f.id)!==10)};
const projection=geoNaturalEarth1().fitExtent([[10,8],[510,252]],countries);
const path=geoPath(projection);
const positions:Record<string,[number,number]>={'Canadá':[-106,57],'España':[-3.7,40.4],'Alemania':[10.5,51.2],'Francia':[2.3,46.5],'Japón':[138,37],'Estados Unidos':[-100,39],'Brasil':[-50,-14],'México':[-102,23]};
export default function WorldMap({active,onSelect,selected:highlighted=''}:{active:string[];selected?:string;onSelect:(country:string)=>void}){
 function selectOnKey(e:React.KeyboardEvent,country:string){if(e.key==='Enter'||e.key===' '){e.preventDefault();onSelect(country)}}
 return <svg viewBox="0 0 520 260" className="world" role="group" aria-label="Mapa de cooperación aprobada. Los países destacados tienen registros; seleccione uno para ver el detalle.">
 {countries.features.map((f,index)=>{const partner=partners.find(p=>Number(p.id)===Number(f.id)),enabled=!!partner&&active.includes(partner.country),isSelected=enabled&&partner.country===highlighted;return <path key={`${f.id??'country'}-${index}`} d={path(f)||''} fill={isSelected?'#f9d248':enabled?'#64b4ca':'#254b6b'} stroke="#0b2035" strokeWidth={.65} className={enabled?'map-country':''} role={enabled?'button':undefined} tabIndex={enabled?0:undefined} aria-label={enabled?partner.country:undefined} aria-pressed={enabled?isSelected:undefined} onKeyDown={e=>{if(enabled)selectOnKey(e,partner.country)}} onClick={()=>{if(enabled)onSelect(partner.country)}}><title>{`${partner?.country||String((f.properties as {name?:string})?.name||'')}${enabled?' · con cooperación aprobada de demostración':''}`}</title></path>})}
 {active.map(country=>{const point=positions[country]&&projection(positions[country]);if(!point)return null;return <g key={country} className="map-location" onClick={()=>onSelect(country)} aria-hidden="true"><circle cx={point[0]} cy={point[1]} r={country===highlighted?6:4} fill={country===highlighted?'#f9d248':'#d0f5e7'} stroke="#12374b" strokeWidth={1.2}/><circle cx={point[0]} cy={point[1]} r={country===highlighted?9:7} fill="none" stroke={country===highlighted?'#f9d248':'#9cdbd4'} strokeOpacity={.65} strokeWidth={.8}/><title>{country} · ver cooperación</title></g>})}
 <circle cx={projection([-74.07,4.71])?.[0]} cy={projection([-74.07,4.71])?.[1]} r="3.4" fill="#ffd46a" stroke="#16364d" strokeWidth={1.2}><title>Bogotá · ciudad de origen</title></circle>
 </svg>
}
