const telegramNicknames = {
    'hyli.berin': 'falso_makima',
    'lVyrdalakl': 'lVyrdalakl',
    'wolk92': 'alexon921',
    'Luc': 'BaNiXiDa',
    'Luca': 'BaNiXiDa',
    'Lucka': 'BaNiXiDa',
    'Tir': 'BaNiXiDa',
    'Lic': 'BaNiXiDa',
    'Nevid': 'BaNiXiDa',
    'Архангель': 'BaNiXiDa',
    'tuulpaan': 'Tuulpaan',
    'Getsuga': 'SoyHiob',
    'Mikoto_Amata': 'AMATSUKAMIKOTO',
    '_artem_': 'zavaliy_artem',
    'angelsmerti': 'angelsmerti_1988',
    'Frytka': 'sleepe_xx',
    'Kuyashii.': 'weisuuuuu',
    'Nickmur': 'Nickmur_0',
    'xDeadForWhyK1nd': 'xCBEPXCEKPETHOx',
    'Хуачен': 'iiiipny',
    'Ly4ekk': 'Ly4ek4ek',
    'Barbatos776': 'BarbatosWTF',
    'Drax379': 'Drax379',
    'Marina_Twe': 'MarinaTwe',
    'NeKoDemon': 'Ne_KoDemon',
    'Ly4ekk': 'Ly4ek4ek',
    'mariya-car': 'ur_peccator',
    'Republiqua': 'RobertZharkov',
    'Zemb': 's_vad1m_tg',
    'Knarrenheins': 'knarrenheins',
    'HellFire': 'Alexndr_telega',
    'NewerBurn': 'harkunovdmytro',
    'mr.Badcat': 'mrBadcat',
    'Luffy2005': 'Mykola_Stupak',
    'Reconstruction': 'Vladislav_D_O',
    'Maksimus': 'Maksimus927',
    'finsert123': 'cheaterreport',
    'Бухус323': 'Бухус323',
    'katana_2': 'dexxxterity',
    'Godzilla%20top': 'AlmosMr',
    'DolenBask': 'DolenBask',
    'DJperl': 'DJperlovka'
};

// Функция для извлечения никнеймов
function extractNicknames() {
    const nicknames = Array.from(document.querySelectorAll('.club-boost__owners a')).map(link => {
        const href = link.getAttribute('href');
        if (href && href.includes('/user/')) {
            const siteNickname = href.split('/')[2];
            const telegramNickname = telegramNicknames[siteNickname];
            if (telegramNickname) {
                return telegramNickname;
            }
        }
    });

    const validNicknames = nicknames.filter(nickname => nickname !== undefined)
                                    .map(nickname => `@${nickname}`);
    return validNicknames.join(' '); // Возвращает строку никнеймов
}

// Функция для отправки текста в Telegram
function sendToTelegram(message) {
    const botToken = '7588352182:AAHlTQ1SvZz1sd-QIKZWnhI_U20XzKt4Gho';  // Замените на ваш токен
    const chatIds = {
    mainGroup: '-1002404622794',  // ID супергруппы "Кодекс авантюриста"
};
const threadIds = {
    specificTopic: '456789123'  // Замените на ID нужного топика
};
    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                console.log('Сообщение успешно отправлено в Telegram');
            } else {
                console.error('Ошибка при отправке сообщения в Telegram:', data);
            }
        })
        .catch(error => {
            console.error('Ошибка при запросе в Telegram API:', error);
        });
}

// Функция для отправки картинки в Telegram
function sendImageToTelegram(imageUrl) {
    const botToken = '7588352182:AAHlTQ1SvZz1sd-QIKZWnhI_U20XzKt4Gho';  // Замените на ваш токен
    const chatId = '-1002457610219';      // Замените на ваш chat_id

    const url = `https://api.telegram.org/bot${botToken}/sendPhoto?chat_id=${chatId}&photo=${encodeURIComponent(imageUrl)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                console.log('Изображение успешно отправлено в Telegram');
            } else {
                console.error('Ошибка при отправке изображения в Telegram:', data);
            }
        })
        .catch(error => {
            console.error('Ошибка при запросе в Telegram API:', error);
        });
}

// Функция для получения URL картинки
function getImageUrl() {
    const image = document.querySelector('img');  // Измените на селектор, который находит нужное изображение
    if (image) {
        return image.src; // Возвращает URL изображения
    }
    return null;
}

// Функция для загрузки предыдущих данных из localStorage
function loadPreviousState() {
    return {
        nicknames: localStorage.getItem('previousNicknames') || '',
        imageUrl: localStorage.getItem('previousImageUrl') || '',
    };
}

// Функция для сохранения текущих данных в localStorage
function saveCurrentState(nicknames, imageUrl) {
    localStorage.setItem('previousNicknames', nicknames);
    localStorage.setItem('previousImageUrl', imageUrl);
}

// Основная логика проверки изменений и отправки данных
function checkForUpdates() {
    const currentNicknames = extractNicknames();
    const currentImageUrl = getImageUrl();

    const { nicknames: previousNicknames, imageUrl: previousImageUrl } = loadPreviousState();

    let shouldSend = false;

    // Проверяем, изменился ли список пользователей
    if (currentNicknames !== previousNicknames) {
        if (currentNicknames) {
            sendToTelegram(`Пользователи, которые могут Внести Карту:\n${currentNicknames}`);
            shouldSend = true;
        }
    }
    if (currentNicknames === previousNicknames && currentImageUrl === previousImageUrl) {
        console.log('Дані не змінилися. Повідомлення не відправляється.');
        return;
    }
    // Проверяем, изменилась ли картинка
    if (currentImageUrl !== previousImageUrl) {
        if (currentImageUrl) {
            sendImageToTelegram(currentImageUrl);
            shouldSend = true;
        }
    }

    if (shouldSend) {
        // Сохраняем новое состояние только если были изменения
        saveCurrentState(currentNicknames, currentImageUrl);
    } else {
        console.log('Изменений нет, отправка не требуется.');
    }
}

// Запускаем проверку изменений каждые 5 секунд
setInterval(checkForUpdates, 5000);

// Запускаем сразу при загрузке страницы
checkForUpdates();
