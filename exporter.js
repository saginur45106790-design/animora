// Deterministic frame-by-frame export: slow devices take longer, but frames are not skipped.
import { Output, Mp4OutputFormat, WebMOutputFormat, BufferTarget, CanvasSource, AudioBufferSource, Quality, canEncodeVideo, canEncodeAudio } from './vendor/mediabunny.mjs';
export async function renderMovie({canvas,paint,duration,fps,audio,signal,onProgress}){
 if(typeof VideoEncoder==='undefined')throw Error('এই ব্রাউজারে frame-by-frame export নেই। HTTPS-এ Chrome দিয়ে খুলুন অথবা Live recording বেছে নিন।');
 const w=canvas.width,h=canvas.height;
 let codec=null;for(const c of ['avc','vp9','vp8'])if(await canEncodeVideo(c,{width:w,height:h})){codec=c;break;}
 if(!codec)throw Error('এই রেজল্যুশনে encoder পাওয়া যায়নি। 720p বা 540p চেষ্টা করুন।');
 const mp4=codec==='avc',audioCodec=mp4?'aac':'opus';
 if(audio&&!await canEncodeAudio(audioCodec,{numberOfChannels:Math.min(2,audio.numberOfChannels),sampleRate:audio.sampleRate}))throw Error('অডিও encoder নেই। অডিও সরান অথবা Live recording বেছে নিন।');
 const output=new Output({format:mp4?new Mp4OutputFormat({fastStart:'in-memory'}):new WebMOutputFormat(),target:new BufferTarget()});
 const video=new CanvasSource(canvas,{codec,quality:new Quality('high'),keyFrameInterval:2,latencyMode:'quality'});output.addVideoTrack(video,{frameRate:fps});
 let music=null;if(audio){music=new AudioBufferSource({codec:audioCodec,quality:new Quality('high')});output.addAudioTrack(music);}
 try{await output.start();const total=Math.round(duration*fps);for(let i=0;i<total;i++){if(signal.cancelled)throw Error('Export cancelled');paint(i/fps);await video.add(i/fps,1/fps);if(music&&i%fps===0){const offset=Math.floor(i/fps),len=Math.min(audio.sampleRate,Math.round((duration-offset)*audio.sampleRate));if(len>0){const segment=new AudioBuffer({numberOfChannels:Math.min(2,audio.numberOfChannels),length:len,sampleRate:audio.sampleRate});for(let ch=0;ch<segment.numberOfChannels;ch++){const source=audio.getChannelData(ch),dest=segment.getChannelData(ch);for(let k=0;k<len;k++)dest[k]=source[(offset*audio.sampleRate+k)%source.length];}await music.add(segment);}}onProgress(i+1,total);if(i%3===0)await new Promise(r=>setTimeout(r,0));}video.close();music?.close();await output.finalize();return{blob:new Blob([output.target.buffer],{type:mp4?'video/mp4':'video/webm'}),extension:mp4?'mp4':'webm',frames:total};}catch(e){await output.cancel();throw e;}
}
