import { debounce, throttle } from "./utils.ts";

export function removeElementsByClassName(className: string) {
    const elems = document.getElementsByClassName(className);
    Array.from(elems).forEach(el => el.remove());
    return;
}

export function createDialogBackground() {
    const root = document.getElementById('root');
    const dialogBackground = document.createElement('div');

    dialogBackground.className = 'dialog__background';
    root?.append(dialogBackground);
    return;
}

export function consoleLog(data: any, {...options}) {
    const {color, fontWeight} = options;
    const _emoji = '\u{1F6A7}';
    const _color = color ? color : 'orange';
    const _fontWeight = fontWeight ? fontWeight : 'normal';

    console.log(`${_emoji} %c${data}`, 
        `color: ${_color}; 
        font-weight: ${_fontWeight};`);
    return;
}

export function setCookie(name: string, value: any, exprires: number = 1) {
    const now = new Date();
    const exp = new Date(now.valueOf() + exprires * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${exp};path='/';`;
    return;
}

export function getCookie(name: string) {
    const val = document.cookie.match('(^|;)?' + name + '=([^;]*)(;|$)');
    return val ? val[2] : null;
}

export function deleteCookie(name: string) {
    // 쿠키를 삭제하려면 해당 날짜 이전으로 설정하면 됨.
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    return;
}

export function scrollNavigation(className: string) {
    let prevPos = 0;
    globalThis.addEventListener('scroll', debounce(() => {
        const currentPos = document.documentElement.scrollTop;
        const showScrollTopPos = 15;

        if (currentPos < 105) {
            document.body.getElementsByClassName(className)[0].classList.add('top');
            document.body.getElementsByClassName(className)[0].classList.remove('scroll-down');
            return;
        }
        if (Math.abs(prevPos - currentPos) <= showScrollTopPos) {
            document.body.getElementsByClassName(className)[0].classList.remove('scroll-up');
            document.body.getElementsByClassName(className)[0].classList.remove('scroll-down');
            document.body.getElementsByClassName(className)[0].classList.add('top');
            return;
        }
        if (currentPos > prevPos) {
            document.body.getElementsByClassName(className)[0].classList.remove('top');
            document.body.getElementsByClassName(className)[0].classList.remove('scroll-up');
            document.body.getElementsByClassName(className)[0].classList.add('scroll-down');
        }
        else {
            document.body.getElementsByClassName(className)[0].classList.remove('top');
            document.body.getElementsByClassName(className)[0].classList.remove('scroll-down');
            document.body.getElementsByClassName(className)[0].classList.add('scroll-up');
        }
        prevPos = currentPos;
    }, 150))
    return;
}