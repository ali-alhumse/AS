# الاختبارات الفعلية للمرحلة الثانية

## أدوات الاختبار

- `node --check` لكل وحدات JavaScript.
- خادم Python static على المنفذ 4173.
- Chromium headless مع harness مؤقت يسجل `window.error` و`unhandledrejection`.
- مقارنة `cmp` وSHA-256 مع المصدر الأصلي المستخرج من `AA-main.zip`.

## نتيجة اختبار المشاهد والتفاعلات

```text
1-start-countdown:PASS
2-countdown-visible:PASS
3-balloon:PASS
4-balloon-skip:PASS
5-heart:PASS
6-heart-continue:PASS
7-cards:PASS
8-card-switch:PASS
9-card-next:PASS
10-cake:PASS
11-cake-continue:PASS
12-gallery:PASS
13-gallery-next:PASS
14-gallery-keyboard:PASS
15-gallery-finish:PASS
16-exit:PASS
17-messages:PASS
18-replay-callback:PASS
19-close:PASS
20-console:PASS
errors=[]
```

الاختبار دخل كل renderer على حدة، وفحص وجود DOM/Canvas، ونفّذ Skip وContinue وتبديل البطاقات وأزرار المعرض ولوحة المفاتيح وزر الإنهاء وأزرار شاشة النهاية.

## اختبار الشموع

تم النقر على مواضع اللهب الخمسة فعليًا في Canvas، مع محاكاة RAF زمنية لأن Chromium headless خفّض عدد الإطارات الطبيعية. النتيجة:

```text
blown=5 button=flex errors=[]
```

تم توسيع hit-test من 25 إلى 32 بكسل ضمن المرحلة الثانية بعد اكتشاف أن إحدى الشموع لا تستجيب دائمًا عند تصغير Canvas.

## localStorage والعداد وإعادة التشغيل

- شاشة البداية: `start-slide` و`countdownWrap` ظهرا، والعداد كان مرئيًا.
- عند ضبط `asma_birthday=true`: `stored-exit=PASS messages=21 key=PASS`.
- callback إعادة التشغيل: `exit-replay-callback=PASS`، ومنطق التطبيق يحذف `asma_birthday` قبل `location.reload()`.
- لم يُعتمد اختبار reload الحي الكامل في headless لأن حلقات الرسم تبقي عملية Chromium مفتوحة؛ لذلك لا يُسجل كاختبار reload مستقل ناجح.

## Canvas ومقاسات viewport

```text
viewport=500x553  heart=500x553  cake=500x553  errors=[]
viewport=768x937  heart=768x937  cake=768x700  errors=[]
viewport=1440x813 heart=1440x813 cake=800x700  errors=[]
```

## HTTP والتحميل

```text
/                     200
/src/app/main.js      200
/src/data/cards.json  200
/images/img1.jpg      200
```

جميع imports النسبية في 13 وحدة JavaScript حُلّت بنجاح. لم تسجل harness أخطاء Console أو `unhandledrejection`. رسائل D-Bus/UPower في stderr تخص بيئة Chromium.

## التكافؤ مع المصدر

- ملفات JSON الثلاثة مطابقة حرفيًا.
- الصور الأحد عشر و`images/1` مطابقة في SHA-256.
- ملفات `legacy/main.js` و`legacy/index.html` و`legacy/style.css` مطابقة حرفيًا.
- لا توجد أداة بناء أو dependency جديدة.
