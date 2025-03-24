import type { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

export interface State {
  formModelState: {
    email: string;
    about: string;
    age: 0;
  };
}

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    formModelState: {
      email: "",
      about: "",
      age: 0,
    },
  },
  mutations: {
    clearForm(state) {
      state.formModelState = {
        email: "",
        about: "",
        age: 0,
      };
    },
  },
});
export function useStore() {
  return baseUseStore(key);
}
