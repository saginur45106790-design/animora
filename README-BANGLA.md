# Animora — GitHub + Render ফ্রি সেটআপ

এটি realme C75-এর Chrome-এ খোলার উপযোগী 3D অ্যানিমেশন ওয়েব অ্যাপ। কোনো পেইড AI API, ডেটাবেস বা ভিডিও-রেন্ডারিং সার্ভার প্রয়োজন নেই। Render শুধু ফাইল সরবরাহ করবে; অ্যানিমেশন ও ভিডিও রেকর্ডিং আপনার ফোনে হবে।

## ১। ফোনে ফাইল প্রস্তুত

1. Animora-GitHub-Render.zip ডাউনলোড করুন।
2. ফোনের Files / ZArchiver দিয়ে শুধু এই বাইরের ZIP Extract করুন।
3. ভিতরে `animora-render` ফোল্ডার পাবেন। এই ফোল্ডারের সব ১৬টি ফাইল GitHub-এ দিতে হবে।
4. ভিতরের `assets-1.zip` ও `assets-2.zip` খুলবেন না। এই দুই ফাইলের মধ্যে ১,৮৮৩টি মডেল এবং থাম্বনেইল আছে। Render নিজে এগুলো খুলবে।

## ২। GitHub-এ আপলোড

1. GitHub-এ লগইন করে New repository খুলুন।
2. Repository name: `animora-studio`। Public বা Private—আপনার পছন্দ।
3. Create repository চাপুন।
4. `uploading an existing file` বা `Add file → Upload files` চাপুন। মোবাইলে না পেলে Chrome-এর Desktop site ব্যবহার করুন।
5. Extract করা `animora-render` ফোল্ডারের ভিতরের সব ফাইল একসঙ্গে নির্বাচন করুন।
6. আপলোড শেষ হলে Commit changes চাপুন।
7. রিপোজিটরির প্রথম পাতায় `build.py`, `index.html`, `assets-1.zip`, `assets-2.zip` দেখা যেতে হবে। অতিরিক্ত ফোল্ডারের ভিতরে রাখবেন না।

বাইরের Animora-GitHub-Render.zip সরাসরি GitHub-এ আপলোড করবেন না। GitHub ব্রাউজারে প্রতিটি ফাইলের সীমা 25 MiB; ভিতরের প্রতিটি ফাইল সেই সীমার নিচে রাখা হয়েছে। কয়েক হাজার মডেল হাতে আপলোড করতে হবে না।

## ৩। Render-এ লাইভ করুন

Render Dashboard → New → Static Site → GitHub repository connect → `animora-studio` বেছে নিন।

| ঘর | যা দেবেন |
|---|---|
| Name | animora-studio অথবা খালি আছে এমন নাম |
| Branch | main |
| Root Directory | খালি |
| Build Command | python3 build.py |
| Publish Directory | dist |
| Environment Variables | কিছু লাগবে না |

তারপর Deploy Static Site চাপুন। Build log-এ `Build successful: 1883 models plus thumbnails` দেখা যাবে। Render থেকে আপনার `.onrender.com` লিংক পাবেন। এই প্রকল্পে Start Command, database, API key বা Web Service লাগে না। `render.yaml`-ও আছে; চাইলে Blueprint দিয়ে ব্যবহার করতে পারবেন।

Render Static Site বিনামূল্যে deploy করা যায়, তবে মাসিক bandwidth ও pipeline ব্যবহারের সীমা আছে। সম্পূর্ণ সীমাহীন হোস্টিং নয়। নিজস্ব paid domain দরকার নেই; `.onrender.com` ঠিকানা ব্যবহার করুন।

## ৪। প্রথম ভিডিও

1. সাইট Chrome-এ খুলুন।
2. Forest দৃশ্য দিয়ে শুরু করুন।
3. Asset library-তে মডেল চাপুন; এটি দৃশ্যে যুক্ত হবে। ইংরেজিতে `tree`, `car`, `dog` লিখে খুঁজতে পারবেন।
4. Scene timeline-এ অবজেক্ট বেছে Motion, Position, Size ও Rotation ঠিক করুন।
5. প্রথমে Duration: 10 seconds, Quality: 540p রাখুন।
6. Reels-এর জন্য Canvas ratio: 9:16 নির্বাচন করুন।
7. বাংলা লেখা Title overlay-তে দিন। নিজের গান/কণ্ঠ Music / voice-এ দিতে পারবেন।
8. ▶ দিয়ে দেখুন। Export video চাপুন। পেজ খোলা ও ফোনের স্ক্রিন জ্বালানো রাখুন।
9. শেষ হলে Download video চাপুন। সমর্থিত ব্রাউজারে H.264 MP4; অন্য ক্ষেত্রে WebM।

## কী আছে

- ১৯টি প্যাকে ১,৮৮৩টি বাস্তব ডাউনলোড করা Kenney CC0 মডেল।
- গাছ, প্রাণী, গাড়ি, বাড়ি, আসবাব, খাবার, মহাকাশ ও অন্যান্য মডেল।
- Forest, Space, City ও Empty দৃশ্য।
- Spin, Bounce, Float, Move, Sway; মডেলের মধ্যে animation clip থাকলে সেটিও ব্যবহার করা যায়।
- ক্যামেরা orbit, push-in ও হাতে ঘোরানো; particles; caption; optional audio।
- ১–৩০০ সেকেন্ড: ১০/২০ সেকেন্ড বা ১–৫ মিনিট।
- 16:9, 9:16, 1:1; 540p ও 720p।
- Editable project download/import; নিজের GLB import; PNG frame save।
- কোনো ওয়াটারমার্ক নেই।

## বাস্তব সীমা

এটি low-poly 3D scene editor; Cinema 4D, AI text-to-video বা সিনেমার মানের স্বয়ংক্রিয় চরিত্র অ্যানিমেশন নয়। অধিকাংশ মডেল static; Motion দিয়ে নড়াচড়া যোগ করবেন। 4D বলতে আলাদা কোনো ভিডিও ফরম্যাট নেই এখানে।

৫ মিনিট ভিডিও রপ্তানি করতে প্রায় ৫ মিনিট লাগে। ফোনের ক্ষমতা ও দৃশ্যের জটিলতার ওপর frame rate নির্ভর করে। 24 FPS একটি লক্ষ্য, নিশ্চয়তা নয়। ৪৫টির বেশি অবজেক্ট এক দৃশ্যে রাখা যাবে না। GLB: 15 MB, audio: 40 MB, project import: 30 MB পর্যন্ত।

প্রজেক্ট ব্রাউজারে স্থানীয়ভাবে সেভ হয়। ব্রাউজার ডেটা মুছলে হারাতে পারে, তাই Project দিয়ে JSON ডাউনলোড করুন। অন্য ফোনে এই JSON Open project দিয়ে খুলুন। অডিও আবার বেছে দিতে হবে। নিজের আমদানি করা GLB প্রজেক্টে থাকে।

WebGL না থাকলে compatibility renderer চলে; এতে গতি ও ভিজ্যুয়াল মান কমে। পরীক্ষার cloud browser-এ WebGL বন্ধ ছিল, তাই বিকল্প renderer পরীক্ষা হয়েছে। realme C75-এ সরাসরি পরীক্ষা করা হয়নি। ১০ সেকেন্ড WebM এবং ২ সেকেন্ড portrait H.264 MP4 তৈরি ও decode করে যাচাই হয়েছে। ৫ মিনিট ভিডিও, audio upload এবং GPU rendering সরাসরি পরীক্ষা হয়নি।

## কোড পরিবর্তন

`index.html` = অ্যাপের কাঠামো; `style.css` = ডিজাইন; `app.js` = সম্পাদক ও ভিডিও; `software-renderer.js` = compatibility renderer; `catalog.json` = মডেল তালিকা; `build.py` = Render-এ ফাইল সাজানো। GitHub-এ কোড বদলে Commit করলে Render-এর Auto Deploy চালু থাকলে আপডেট হবে।

## লাইসেন্স ও উৎস

মডেল: https://kenney.nl/assets — CC0। প্রতিটি প্যাকের মূল লিংক সাইটের credits.html এবং catalog.json-এ আছে। সব ১৯টি মূল প্যাকের CC0 ঘোষণা যাচাই করা হয়েছে। GLB ও thumbnail সংগ্রহ: https://github.com/Hidencod/tge-assets । Three.js: MIT, THREE-LICENSE.txt।

Render: https://render.com/docs/static-sites
GitHub upload limits: https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository
