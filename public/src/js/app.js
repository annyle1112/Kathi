let enableNotificationsButtons = document.querySelectorAll('.enable-notifications'); // für PB

if ('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
            console.log('service worker registriert')
        })
        .catch(
            err => { console.log(err); }
        );
}

function displayConfirmNotification() {
    if('serviceWorker' in navigator) {
        let options = {
            body: 'You successfully subscribed to our Notification service!',
            icon: '/src/images/icons/fiw96x96.png',
            image: '/src/images/htw-sm.jpg',
            lang: 'de-DE',
            vibrate: [100, 50, 200],
            badge: '/src/images/icons/fiw96x96.png',
            tag: 'confirm-notification',
            renotify: true,
            actions: [
                { action: 'confirm', title: 'Ok', icon: '/src/images/icons/fiw96x96.png' },
                { action: 'cancel', title: 'Cancel', icon: '/src/images/icons/fiw96x96.png' },
            ]
        };

        navigator.serviceWorker.ready
            .then( sw => {
                sw.showNotification('Successfully subscribed (from SW)!', options);
            });
    }
}

function configurePushSubscription() {
    if(!('serviceWorker' in navigator)) {
        return
    }

    let swReg;
    navigator.serviceWorker.ready
        .then( sw => {
            swReg = sw;
            return sw.pushManager.getSubscription();
        })
        .then( sub => {
            if(sub === null) {
                // create a new subscription
                swReg.pushManager.subscribe();
            } else {
                // already subscribed
            }
        });
}

function askForNotificationPermission() { //für PB
    Notification.requestPermission( result => {
        console.log('User choice', result);
        if(result !== 'granted') {
            console.log('No notification permission granted');
        } else {
            // notifications granted
            displayConfirmNotification(); //unten rechts
            //configurePushSubscription(); //schade
        }
    });
}

if('Notification' in window && 'serviceWorker' in navigator) {
    for(let button of enableNotificationsButtons) {
        button.style.display = 'inline-block';
        button.addEventListener('click', askForNotificationPermission);
    }
}




// function displayConfirmNotification() {
//     let options = { body: 'You successfully subscribed to our Notification service!'};
//     new Notification('Successfully subscribed!', options);
// }







// let enableNotificationsButtons = document.querySelectorAll('.enable-notifications');


// if ('serviceWorker' in navigator) {
//     navigator.serviceWorker
//         .register('/sw.js')
//         .then(function() {
//             console.log('service worker registriert')
//         });
// }

// function displayConfirmNotification() {
//     if('serviceWorker' in navigator) {
//         let options = { body: 'You successfully subscribed to our Notification service!',
//         icon: '/src/images/icons/fiw96x96.png',
//         image: '/src/images/htw-sm.jpg',
//         lang: 'de-DE',
//         vibrate: [100, 50, 200],
//         badge: '/src/images/icons/fiw96x96.png',
//         tag: 'confirm-notification',
//         renotify: true,
//         actions: [
//             { action: 'confirm', title: 'Ok', icon: '/src/images/icons/fiw96x96.png' },
//             { action: 'cancel', title: 'Cancel', icon: '/src/images/icons/fiw96x96.png' },
//         ]};
        

//         navigator.serviceWorker.ready
//             .then( sw => {
//                 sw.showNotification('Successfully subscribed (from SW)!', options);
//             });
//     }

// }

// function urlBase64ToUint8Array(base64String) {
//     var padding = '='.repeat((4 - base64String.length % 4) % 4);
//     var base64 = (base64String + padding)
//         .replace(/\-/g, '+')
//         .replace(/_/g, '/');

//     var rawData = window.atob(base64);
//     var outputArray = new Uint8Array(rawData.length);

//     for (var i = 0; i < rawData.length; ++i) {
//         outputArray[i] = rawData.charCodeAt(i);
//     }
//     return outputArray;
// }

// function configurePushSubscription() {
//     if(!('serviceWorker' in navigator)) {
//         return
//     }
//     let swReg;
//     navigator.serviceWorker.ready
//         .then( sw => {
//             swReg = sw;
//             return sw.pushManager.getSubscription();
//         })
//         .then( sub => {
//             if(sub === null) {
//                 // create a new subscription
//                 let vapidPublicKey = 'BGJCXkZCArypzkj7P0l_1egA7wLpCMZCQNvl5IpBGUy-MYreuJa-ol_4r8mvUTAh9fEtHC7TfP9seNg262vSK9I';
//                 let convertedVapidPublicKey = urlBase64ToUint8Array(vapidPublicKey);
//                 return swReg.pushManager.subscribe({
//                     userVisibleOnly: true,
//                     applicationServerKey: convertedVapidPublicKey,
//                 });
//             } else {
//                 // already subscribed
//             }
//         })
//         .then( newSub => {
//             return fetch('http://localhost:3000/subscription', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Accept': 'application/json'
//                 },
//                 body: JSON.stringify(newSub)
//             })
//             .then( response => {
//                 if(response.ok) {
//                     displayConfirmNotification();
//                 }
//             })
//         });
// }

// function askForNotificationPermission() {
//     Notification.requestPermission( result => {
//         console.log('User choice', result);
//         if(result !== 'granted') {
//             console.log('No notification permission granted');
//         } else {
//             // notifications granted
//             configurePushSubscription();
//         }
//     });
// }

// if('Notification' in window && 'serviceWorker' in navigator) {
//     for(let button of enableNotificationsButtons) {
//         button.style.display = 'inline-block';
//         button.addEventListener('click', askForNotificationPermission);
//     }
// }