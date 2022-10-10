import { atom } from "recoil";

export const testState = atom<boolean>({
    key:"testState",
    default:false
})

export const burgerMenuState = atom<boolean>({
    key:"burgerMenuState",
    default:false
})