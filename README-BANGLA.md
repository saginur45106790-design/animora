# Animora Studio 2 — GitHub + Render

ফোনে 3D scene, চরিত্রের pose, চলাচল ও camera keyframe দিয়ে ভিডিও তৈরি। Paid API লাগে না। Render ফাইল পরিবেশন করে; rendering আপনার ফোনেই হয়।

## আপডেট ও deploy

1. বাইরের Animora-GitHub-Render.zip Extract করুন।
2. ভিতরের animora-render ফোল্ডারের **২৫টি ফাইল** GitHub repository-র প্রথম স্তরে upload করুন। একই নামের পুরোনো ফাইল replace করে Commit changes করুন।
3. assets-1.zip ও assets-2.zip Extract করবেন না। আগের সংস্করণে এগুলো upload থাকলে আবার দেওয়া জরুরি নয়।
4. Render Auto Deploy চালু থাকলে rebuild হবে; অন্যথায় Deploy latest commit করুন।
5. পুরোনো project আগে Project বোতামে backup করুন। নতুন সাইট reload করে Story খুলুন। পুরোনো autosave থাকলে সেটিই প্রথমে খুলবে।

নতুন deploy: Render → New → Static Site → GitHub repository connect।

| Setting | Value |
|---|---|
| Branch | main |
| Root Directory | খালি |
| Build Command | python3 build.py |
| Publish Directory | dist |
| Environment Variables | লাগবে না |

Web Service নয়। ফ্রি hosting-এর bandwidth/build সীমা থাকে। প্রতিটি source file GitHub browser upload-এর 25 MiB সীমার নিচে। বাইরের পুরো ZIP সরাসরি repository-তে রাখবেন না।

## কী আছে

- মোট **১,৯১৩ catalog item**: আগের ১,৮৮৩ Kenney model + ১৮ নতুন rounded মানুষ/প্রাণী + ১০ উপকরণ + animated Robot ও Fox। সবগুলো rigged character নয়।
- মানুষ: Arif, Maya, Nila, Rafi, Tara, Dadu, Explorer, Chef, Farmer, Doctor। প্রাণী: কুকুর, বিড়াল, খরগোশ, পান্ডা, ভালুক, সিংহ, শূকর, পেঙ্গুইন।
- Walk, Run, Wave, Dance, Jump, Sit, Nod preset; উপযুক্ত চরিত্রে joint pose, মুখ খোলা ও blink।
- X/Y/Z position, তিন অক্ষে rotation, size, joint pose, animation clip/speed ও উপলব্ধ morph target-এর keyframe। Smooth/Linear/Hold interpolation।
- Camera keyframe, রং, আলো, আকাশ, মাটি; duplicate/focus; পাঁচ snapshot undo/redo।
- GLB import, project JSON backup/import, caption, audio, PNG frame।
- ১–৩০০ সেকেন্ড; 16:9/9:16/1:1; 540p/720p/1080p; 24/30 FPS নির্বাচন।

## নিজের মতো চলাচল

1. Story খুলে character যোগ করুন; timeline থেকে সেটি বাছুন।
2. সময় 0, X=-2, Y=0, Z=0, Action=Walk দিন; ◆ Save keyframe চাপুন।
3. সময় 4, X=2 দিন; আবার save করুন।
4. Play-তে চার সেকেন্ডে বাম থেকে ডানে যাবে। সময় 2-এ মাঝখানে থাকবে। Walk preset নিজে স্থান বদলায় না; position keyframe পথ ঠিক করে।
5. থামাতে সময় 4-এ Action=Idle দিয়ে একই keyframe আবার save করুন।
6. Pose-এ joint angle পরিবর্তন করে প্রয়োজনের সময়ে keyframe save করুন। Unsaved pose থাকলে timeline-এ পরিবর্তন স্থায়ী হয়নি।
7. Camera হাতে ঘুরিয়ে পছন্দের সময়ে camera keyframe save করুন; Camera mode=Keyframes দিন।

## HD export এবং ফোনের সীমা

প্রথমে ৫–১০ সেকেন্ড, অল্প চরিত্র, preview 360p এবং export 720p দিয়ে পরীক্ষা করুন। Preview এবং export resolution আলাদা।

Frame-by-frame: HTTPS এবং WebCodecs encoder সমর্থন দরকার। নির্দিষ্ট timestamp-এ প্রতিটি frame তৈরি হয়; ধীর ফোনে বেশি সময় লাগে। MP4/H.264 না থাকলে সমর্থিত WebM codec ব্যবহার হয়। পরীক্ষার HTTP browser-এ encoder অনুপস্থিত থাকায় এই মোডের পূর্ণ export পরীক্ষা সম্ভব হয়নি।

Live recording: MediaRecorder fallback। ফোনের গতি অনুযায়ী frame drop ও সময়ের অসঙ্গতি হতে পারে। পরীক্ষায় 1920×1080 H.264 MP4 decode হয়েছে; GPU-বিহীন renderer-এ প্রায় 1 FPS এবং সময়ের অসঙ্গতি ছিল। এটি smooth HD playback-এর প্রমাণ নয়।

পেজ সামনে ও screen জ্বালিয়ে রাখুন। দীর্ঘ HD export RAM, তাপ ও battery বেশি ব্যবহার করে; output memory-তে তৈরি হয়। ছোট clip দিয়ে শুরু করুন। realme C75, পূর্ণ ৫ মিনিট, audio-সহ frame export এবং GPU rendering সরাসরি পরীক্ষা করা হয়নি।

এটি Blender/Cinema 4D-এর পূর্ণ বিকল্প নয়। সিনেমার মান, সব বাস্তব বস্তু, automatic lip sync, cloth/hair physics, IK বা AI video generation নেই। নতুন চরিত্রগুলো সহজ rounded cartoon। বিস্তারিত character-এর জন্য উপযুক্ত licensed GLB import করুন। Google-এর ছবি editable model নয়। “4D” এখানে আলাদা video format নয়।

প্রতি scene সর্বোচ্চ ৪৫ object, ২০০ keyframe/object। GLB 15 MB, audio 40 MB, project import 30 MB। Browser data মুছলে autosave হারাবে; JSON backup রাখুন। Imported GLB project-এ থাকে, audio আবার নির্বাচন করতে হবে।

## যাচাই ও source

Build-এ ১,৮৮৩ model এবং thumbnail path যাচাই। Keyframe midpoint, shortest rotation, pose, action boundary, replacement, hold ও camera target পরীক্ষা। Browser-এ keyframe edit, reload, pose save এবং Live MP4 export পরীক্ষা।

app.js=editor; characters.js=procedural model; motion.js=interpolation; exporter.js=frame export; software-renderer.js=WebGL fallback; build.py=deployment build।

Kenney: CC0, https://kenney.nl/assets ; GLB/thumbnail mirror: https://github.com/Hidencod/tge-assets । প্যাকভিত্তিক উৎস credits.html-এ।
RobotExpressive: Tomás Laulhé, Don McCurdy modifications, CC0; Robot-LICENSE.md।
Fox: PixelMannen model CC0; tomkranis rig/animation, AsoboStudio/scurest glTF conversion CC BY 4.0। Fox ব্যবহার করা ভিডিওর description-এ লিখুন: “Fox model: PixelMannen (CC0); rig/animation: tomkranis; glTF: AsoboStudio & scurest (CC BY 4.0, https://creativecommons.org/licenses/by/4.0/).” Fox-LICENSE.md দেখুন।
Three.js MIT; Mediabunny 1.62.1 MPL-2.0, unmodified bundle ও license অন্তর্ভুক্ত। লাইসেন্স ফাইল রাখুন। নতুন procedural source এই প্রকল্পের জন্য তৈরি।
Render docs: https://render.com/docs/static-sites
