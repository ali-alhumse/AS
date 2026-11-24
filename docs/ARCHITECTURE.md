# البنية المعمارية

```text
index.html
style.css
images/
src/
  app/main.js
  core/
    scene-manager.js
    event-manager.js
    animation-manager.js
  data/
    constants.js
    cards.json
    memories.json
    messages.json
  scenes/
    start-scene.js
    balloon-scene.js
    heart-scene.js
    cards-scene.js
    cake-scene.js
    gallery-scene.js
    exit-scene.js
  utils/canvas.js
legacy/
```

## المسؤوليات

- `src/app/main.js`: bootstrap، قراءة حالة `localStorage`، تسجيل المشاهد، وربط callbacks الانتقال والإنهاء.
- `SceneManager`: يحتفظ بالمشهد الحالي، ويقدم `start` و`goTo` و`next` و`stopCurrent`.
- `src/scenes/*`: كل مشهد مستقل ويملك DOM ومنطق الرسم والتفاعل الخاص به.
- `src/data/*`: المحتوى الثابت والثوابت، بعيدًا عن منطق العرض.
- `src/utils/canvas.js`: إعداد Canvas على viewport وpolyfill المستخدم في الرسم.
- `EventManager` و`AnimationManager`: طبقتان أساسيتان قابلة لإدخال المستمعات وإطارات الرسم المشتركة عند الحاجة؛ لا توجد مكتبة خارجية أو global state جديدة.
- `legacy/`: نسخة المصدر السابق للمقارنة والاسترجاع، وليست جزءًا من المسار التشغيلي.

## دورة حياة المشهد

ينقل `SceneManager` التحكم إلى renderer واحد في كل مرة، ويمسح cleanup المسجل قبل الانتقال التالي. المشاهد الحالية توقف animation frame بنفسها عند الانتقال عبر أزرارها أو عند اكتمالها، كما كان في السلوك الأصلي. تم تمرير الانتقال كـ callback بدل استدعاء global `nextSlide`.

## البيانات والأصول

الصور بقيت في `images/` كي لا تتغير قيم JSON الأصلية. ملفات JSON أصبحت في `src/data/`، والمسارات في fetch تشير إليها صراحة. `legacy/` يحفظ النسخة القديمة دون حذف أي أصل.
