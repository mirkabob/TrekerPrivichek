# Карманный комбайн

Трекер привычек + калькулятор, фонарик, компас, линейка и кубик. Чистый HTML/CSS/JS, в Android-приложение упаковывается через Capacitor.

## Сборка APK

GitHub Actions собирает APK при каждом коммите: вкладка Actions → последний запуск → Artifacts → `pocketkit-apk`.

Локально:

    npm install
    mkdir -p www && cp index.html style.css *.js www/
    npx cap add android
    npx cap sync android
    cd android && ./gradlew assembleDebug

Лицензия: MIT.
