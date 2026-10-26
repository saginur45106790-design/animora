# Animora Studio 3 — GitHub + Render

ফোনে 3D scene, চরিত্রের pose, চলাচল ও camera keyframe দিয়ে ভিডিও তৈরি। Paid API লাগে না। Render ফাইল পরিবেশন করে; rendering আপনার ফোনেই হয়।

## আপডেট ও deploy

1. বাইরের Animora-GitHub-Render.zip Extract করুন।
2. ভিতরের animora-render ফোল্ডারের **৩০টি ফাইল** GitHub repository-র প্রথম স্তরে upload করুন। একই নামের পুরোনো ফাইল replace করে Commit changes করুন।
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

- মোট **১,৯১৮ catalog item**: আগের ১,৮৮৩ Kenney model + ১৮ নতুন rounded মানুষ/প্রাণী + ১০ উপকরণ + animated Robot ও Fox + ৫ cinematic stone model। সবগুলো rigged character নয়।
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

Frame-by-frame: WebCodecs থাকলে hardware/software encoder দিয়ে MP4 বা WebM। না থাকলে Canvas WebP থেকে প্রতিটি VP8 frame দিয়ে silent WebM তৈরি হয়। এই fallback-এ audio থাকলে error দেখাবে; audio সরান বা Live recording নিন। Fallback output বড় হয়; 180 MB ছাড়ালে বন্ধ হয়। সব mode-এ কম resolution/ছোট clip দিয়ে শুরু করুন।

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


## Studio 3 — আপনার দেওয়া দুটি ভিডিও অনুযায়ী

প্রথম reference: 3D পাথরের দরজা, হাত, sculpture এবং তৈরির প্রক্রিয়া। দ্বিতীয় reference: 2D stick-figure comedy। দুই ধরনের editor আলাদা রাখা হয়েছে। Reference-এর ফুটেজ/সঙ্গীত/লোগো কপি করা হয়নি।

### 2D Cartoon

1. প্রথম পেজের **✎ 2D Cartoon** চাপুন। Chrome-এ Desktop site বন্ধ রাখলে ফোনের বড় controls পাবেন।
2. ২০ সেকেন্ডের original নমুনা: ঘুম থেকে ওঠা → পথে দেখা → গাড়ি চলে যাওয়া। Play দিলে তিনটি scene ধারাবাহিক চলে।
3. Storyboard-এ scene বাছুন; নাম, দৈর্ঘ্য, background, caption বদলান। নতুন scene, duplicate, order এবং delete আছে। Scene শেষে hard cut হয়।
4. মানুষ ও ১২ ধরনের prop: বিছানা, চেয়ার, টেবিল, টয়লেট, গাড়ি, গাছ, বল, ফোন, কাপ, দরজা, মেঘ, সূর্য।
5. চরিত্র বাছুন। সময় 0-তে position/pose দিয়ে ◆ Save; সময় 3-এ অন্য position/pose দিয়ে আবার Save। Smooth/Linear/Hold নির্বাচন করুন।
6. Canvas-এ চরিত্র টেনে সরাতে পারেন। X/Y, size, flip, পুরো শরীর ও মাথা, কাঁধ-কনুই, পা-হাঁটু নিয়ন্ত্রণ আছে। Action হাঁটা/দৌড়/নাচ/হাত নাড়া ইত্যাদি অঙ্গভঙ্গি যোগ করে; স্থির action নিলে নিজের pose সম্পূর্ণ ব্যবহার হয়।
7. Smile/sad/angry/surprised/sleep এবং mouth control আছে। Talk শুধু মুখ নড়ায়; automatic audio lip-sync নয়।
8. নিজের audio export-এ যোগ করা যায়; preview silent। ছোট audio পুরো ভিডিওতে loop করে। Audio project JSON-এ থাকে না।
9. Export video → Frame-by-frame → শুরু করুন → Download। Live recording বিকল্প; ধীর device-এ frame drop হয়।
10. 2D Project JSON এবং 3D Project JSON আলাদা; যার editor থেকে backup করেছেন সেখানেই খুলুন।

সর্বোচ্চ ৪০ scene, মোট ৩০০ সেকেন্ড, প্রতি scene ৩০ element, ২০০ keyframe/object। Scene দৈর্ঘ্য কমালে তার বাইরের keyframe বাদ যায়। Delete/replace-এর আগে Project backup রাখুন।

### 3D Stone gate

3D Studio → **▥ Stone gate** চাপুন। ১২ সেকেন্ডের scene-এ দরজা সরে খোলে, হাত বের হয়/আঙুল বাঁকে, camera সামনে যায়। Timeline-এ door বা hand বেছে keyframes ও pose বদলান। Cinematic stone collection-এ পৃথক slab, pillar, hand, guardian ও stairs আছে। এগুলো original simplified procedural model; reference-এর photoreal texture বা শিল্পীর detailed sculpture নয়। উন্নত নিজের GLB import করার সুবিধা আগের মতো আছে।

### নতুন source files

cartoon.html, cartoon.css, cartoon.js, cartoon-engine.js, cinematic.js — এই পাঁচটি নতুন ফাইল অবশ্যই upload করুন। সঙ্গে পরিবর্তিত app.js, characters.js, exporter.js, index.html, build.py, credits.html এবং README-BANGLA.md replace করুন। Render command/directory আগের মতোই।


### Studio 3 পরীক্ষার ফল

2D frame-by-frame compatibility export: 720×1280 VP8 WebM, ২০.০০ সেকেন্ড, ৩০ FPS, মোট ৬০০ decoded frame যাচাই হয়েছে। একই গল্পের Live MP4 export হয়েছে, তবে পরীক্ষার browser-এ প্রায় ১.১৩ FPS; তাই মসৃণতার জন্য Frame-by-frame নিন। Scene cuts, position interpolation, pose edit এবং reload-এর পরে keyframe সংরক্ষণ পরীক্ষা হয়েছে। 3D gate-এর ৮ সেকেন্ডে বাম দরজা X=-2.50 যাচাই এবং দৃশ্য পরীক্ষা হয়েছে। 1080p/পূর্ণ ৫ মিনিট/realme C75-এ এই নতুন সংস্করণ সরাসরি পরীক্ষা হয়নি; native WebCodecs audio export-ও যাচাই হয়নি।
