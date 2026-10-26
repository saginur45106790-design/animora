// Deterministic frame-by-frame export: slow devices take longer, but frames are not skipped.
import { Output, Mp4OutputFormat, WebMOutputFormat, BufferTarget, CanvasSource, AudioBufferSource, EncodedVideoPacketSource, EncodedPacket, Quality, canEncodeVideo, canEncodeAudio } from './vendor/mediabunny.mjs';
export async function renderMovie({canvas,paint,duration,fps,audio,signal,onProgress}){
 if(typeof VideoEncoder==='undefined')return renderWebP({canvas,paint,duration,fps,audio,signal,onProgress});
 const w=canvas.width,h=canvas.height;
 let codec=null;for(const c of ['avc','vp9','vp8'])if(await canEncodeVideo(c,{width:w,height:h})){codec=c;break;}
 if(!codec)return renderWebP({canvas,paint,duration,fps,audio,signal,onProgress});
 const mp4=codec==='avc',audioCodec=mp4?'aac':'opus';
 if(audio&&!await canEncodeAudio(audioCodec,{numberOfChannels:Math.min(2,audio.numberOfChannels),sampleRate:audio.sampleRate}))throw Error('অডিও encoder নেই। অডিও সরান অথবা Live recording বেছে নিন।');
 const output=new Output({format:mp4?new Mp4OutputFormat({fastStart:'in-memory'}):new WebMOutputFormat(),target:new BufferTarget()});
 const video=new CanvasSource(canvas,{codec,quality:new Quality('high'),keyFrameInterval:2,latencyMode:'quality'});output.addVideoTrack(video,{frameRate:fps});
 let music=null;if(audio){music=new AudioBufferSource({codec:audioCodec,quality:new Quality('high')});output.addAudioTrack(music);}
 try{await output.start();const total=Math.round(duration*fps);for(let i=0;i<total;i++){if(signal.cancelled)throw Error('Export cancelled');paint(i/fps);await video.add(i/fps,1/fps);if(music&&i%fps===0){const offset=Math.floor(i/fps),len=Math.min(audio.sampleRate,Math.round((duration-offset)*audio.sampleRate));if(len>0){const segment=new AudioBuffer({numberOfChannels:Math.min(2,audio.numberOfChannels),length:len,sampleRate:audio.sampleRate});for(let ch=0;ch<segment.numberOfChannels;ch++){const source=audio.getChannelData(ch),dest=segment.getChannelData(ch);for(let k=0;k<len;k++)dest[k]=source[(offset*audio.sampleRate+k)%source.length];}await music.add(segment);}}onProgress(i+1,total);if(i%3===0)await new Promise(r=>setTimeout(r,0));}video.close();music?.close();await output.finalize();return{blob:new Blob([output.target.buffer],{type:mp4?'video/mp4':'video/webm'}),extension:mp4?'mp4':'webm',frames:total};}catch(e){await output.cancel();throw e;}
}

// Compatibility encoder: a lossy WebP image contains a VP8 keyframe. Mux all
// keyframes with explicit timestamps. Works without VideoEncoder; larger files.
export function extractVP8(bytes){
 const text=(i,n)=>String.fromCharCode(...bytes.subarray(i,i+n));
 if(text(0,4)!=='RIFF'||text(8,4)!=='WEBP')throw Error('এই browser WebP encoding সমর্থন করে না। Live recording নিন।');
 const view=new DataView(bytes.buffer,bytes.byteOffset,bytes.byteLength);
 for(let p=12;p+8<=bytes.length;){const n=view.getUint32(p+4,true);if(p+8+n>bytes.length)break;if(text(p,4)==='VP8 ')return bytes.slice(p+8,p+8+n);p+=8+n+(n%2);}
 throw Error('VP8 frame পাওয়া যায়নি। Live recording নিন।');
}
async function renderWebP({canvas,paint,duration,fps,audio,signal,onProgress}){
 if(audio)throw Error('এই browser-এর compatibility frame export silent WebM তৈরি করে। Audio রাখতে HTTPS-এ WebCodecs সমর্থিত Chrome অথবা Live recording নিন।');
 const output=new Output({format:new WebMOutputFormat(),target:new BufferTarget()}),source=new EncodedVideoPacketSource('vp8');
 output.addVideoTrack(source,{frameRate:fps});let bytes=0;const frames=Math.round(duration*fps);
 try{await output.start();for(let i=0;i<frames;i++){if(signal.cancelled)throw Error('Export cancelled');paint(i/fps);
 const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/webp',.9));if(!blob)throw Error('Frame encoding failed');
 const packet=extractVP8(new Uint8Array(await blob.arrayBuffer()));bytes+=packet.length;if(bytes>180e6)throw Error('ভিডিও 180 MB ছাড়িয়েছে। ছোট clip বা কম resolution নিন।');
 await source.add(new EncodedPacket(packet,'key',i/fps,1/fps),i===0?{decoderConfig:{codec:'vp8',codedWidth:canvas.width,codedHeight:canvas.height}}:undefined);onProgress(i+1,frames);
 }source.close();await output.finalize();return{blob:new Blob([output.target.buffer],{type:'video/webm'}),extension:'webm',frames};}catch(e){await output.cancel();throw e;}
}
