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