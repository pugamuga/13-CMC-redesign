import { atom } from "recoil";



export const burgerMenuState = atom<boolean>({
    key:"burgerMenuState",
    default:false
})


export const userHeightState = atom<number>({
    key:"userHeightState",
    default:0
})