import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { WithdrawalAccount } from '@/features/exporter/types/exporter';
import { mockWithdrawalAccounts } from '@/features/exporter/components/data';

export interface WithdrawalAccountsState {
  accounts: WithdrawalAccount[];
}

const initialState: WithdrawalAccountsState = {
  accounts: mockWithdrawalAccounts,
};

const withdrawalAccountsSlice = createSlice({
  name: 'withdrawalAccounts',
  initialState,
  reducers: {
    setWithdrawalAccounts(state, action: PayloadAction<WithdrawalAccount[]>) {
      state.accounts = action.payload;
    },
    addWithdrawalAccount(state, action: PayloadAction<WithdrawalAccount>) {
      const newAccount = action.payload;

      if (newAccount.is_default) {
        state.accounts = state.accounts.map((account) =>
          account.currency === newAccount.currency
            ? { ...account, is_default: false }
            : account,
        );
      }

      state.accounts = [...state.accounts, newAccount];
    },
    setDefaultWithdrawalAccount(state, action: PayloadAction<string>) {
      const id = action.payload;
      const target = state.accounts.find((account) => account.id === id);

      if (!target) return;

      state.accounts = state.accounts.map((account) =>
        account.currency === target.currency
          ? { ...account, is_default: account.id === id }
          : account,
      );
    },
    removeWithdrawalAccount(state, action: PayloadAction<string>) {
      state.accounts = state.accounts.filter(
        (account) => account.id !== action.payload,
      );
    },
    resetWithdrawalAccounts(state) {
      state.accounts = mockWithdrawalAccounts;
    },
  },
});

export const {
  setWithdrawalAccounts,
  addWithdrawalAccount,
  setDefaultWithdrawalAccount,
  removeWithdrawalAccount,
  resetWithdrawalAccounts,
} = withdrawalAccountsSlice.actions;

export const withdrawalAccountsReducer = withdrawalAccountsSlice.reducer;
