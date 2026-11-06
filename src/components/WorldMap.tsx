import {geoNaturalEarth1,geoPath} from 'd3-geo';
import {feature} from 'topojson-client';
import world from 'world-atlas/countries-110m.json';
import type {Topology,GeometryCollection} from 'topojson-specification';
import {partners} from '../data/cooperation';
const topology=world as unknown as Topology<{countries:GeometryCollection}>;
const countries=feature(topology,topology.objects.countries);
const projection=geoNaturalEarth1().fitExtent([[5,5],[490,240]],countries);
const path=geoPath(projection);
export default function WorldMap({active,onSelect}:{active:string[];onSelect:(country:string)=>void}){return <svg viewBox="0 0 500 250" className="world" role="img" aria-label="Mapa de países con cooperación. Consulte el listado de países en Ver mapa detallado.">{countries.features.map((f,index)=>{const partner=partners.find(p=>Number(p.id)===Number(f.id));const selected=partner&&active.includes(partner.country);return <path key={`${f.id ?? 'country'}-${index}`} d={path(f)||''} fill={selected?'#fa7d2c':'#263e58'} stroke="#102033" strokeWidth={.65} className={selected?'map-country':''} onClick={()=>{if(selected&&partner)onSelect(partner.country);}}><title>{`${String((f.properties as {name?:string})?.name||'')}${selected?' · cooperación de demostración':''}`}</title></path>})}<circle cx={projection([-74.07,4.71])?.[0]} cy={projection([-74.07,4.71])?.[1]} r="3" fill="#ffd46a"><title>Bogotá</title></circle></svg>}
