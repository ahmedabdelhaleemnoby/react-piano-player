import React,{ReactElement, useRef, useEffect, useState} from 'react';
import { noteEvent, blockNote } from '../../Utils/TypesForMidi';
import { CanvasRoundRect } from '../../Utils/CanvasFuntions';
import DancingLines from '../../Helpers/CanvasEffects/DancingLines';
import { RandomColorRGBwithMin, RandomColorToAlhpa } from '../../Utils/smallFunctions';
import Bg from '../../Assets/BG.jpg'
import './Tracks.styles.css';


interface TracksProps{
    Width: number
    Height:number
    Speed:number
    Data: Array<noteEvent>
    BlackNumbers: Array<number>
    KeysPositions: Array<any>,
    intervalSpeed: number
}


export default function Tracks({Width,Height,Data,Speed, BlackNumbers, KeysPositions,intervalSpeed}:TracksProps):ReactElement {

    const tracksRef = useRef<HTMLCanvasElement>(null)
    const [blocks,setBlocks] = useState<Array<blockNote>>([]);
    const [timer,setTimer] = useState<number>(0);
    const [context,setContext] = useState<CanvasRenderingContext2D | null>();
    const [EffectLines,setEffectLines] = useState<DancingLines | null>(null);

    useEffect(()=>{
        const Canvas = tracksRef.current
        setContext(Canvas?.getContext('2d'));
        setEffectLines(new DancingLines(Canvas?.getContext('2d')!,Width/52,90,2,8,15,false,true,true,0));
        setInterval(() =>{
            setTimer(prev => prev + 1)
        },intervalSpeed)
    },[])

    useEffect(()=>{
            const blocksToMap = [...blocks];
            let newBlocksToState:Array<blockNote> = [];
            context?.clearRect(0,0,Width,Height);
            EffectLines?.render();
            blocksToMap.map(block =>{
                block.pos_y += Speed;
                context!.shadowColor = block.color;
                context!.shadowBlur = 9;
                CanvasRoundRect(context!,block.color,Math.floor(block.pos_x),Math.floor(block.pos_y - block.height!),Math.floor(block.width),Math.floor(block.height!),5);
                if(block.pos_y - block.height! < Height){
                    newBlocksToState.push(block);
                }
                // if(block.pos_y > Height && timer % 1 === 0){
                //     EffectLines?.AddEffect(block.pos_x,Height,RandomColorToAlhpa(200,200));
                // }
                return null;
            })
            setBlocks(newBlocksToState);
    },[timer])

    useEffect(() =>{
        let newblocks:Array<blockNote> = [...blocks]
        Data && Data.map(Event =>{
            const newBlock:blockNote = {
                color: RandomColorRGBwithMin(190,190,190),
                width: BlackNumbers.includes(Event.NoteNumber) ? Width / 52 / 1.8 : Width / 52,
                Velocity: Event.Velocity,
                NoteNumber: Event.NoteNumber,
                pos_x: KeysPositions[Event.NoteNumber - 21].position,
                pos_y: 0,
                height: Event.Duration / 1000 / 5
            }
            newblocks.push(newBlock);
            return null;
        })
        setBlocks(newblocks);
    },[Data,Speed,Width,BlackNumbers,KeysPositions])

    return (
        <div>
            <div className='Mark'>
                <h1>Piano-Blocks V. 0.1</h1>
                <h2>Closed Beta Version</h2>
            </div>
            <div className='coverPhoto' style={{width:Width.toString() + 'px', height:Height.toString() + 'px', backgroundImage : Bg}}></div>
            <div className='Summer' style={{width:Width.toString() + 'px', marginTop:(Height - 300).toString() + 'px' }}></div>
            <canvas ref={tracksRef} width={Width.toString() + 'px'} height={Height.toString() + 'px'} className='Canvas'></canvas>
        </div>
    )
}
