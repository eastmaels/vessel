// @flow
import hive from '@hiveio/hive-js';
import type { accountStateType } from '../reducers/account';
import * as ProcessingActions from './processing';

export const ACCOUNT_CUSTOM_JSON_STARTED = 'ACCOUNT_CUSTOM_JSON_STARTED';
export const ACCOUNT_CUSTOM_JSON_RESOLVED = 'ACCOUNT_CUSTOM_JSON_RESOLVED';
export const ACCOUNT_CUSTOM_JSON_FAILED = 'ACCOUNT_CUSTOM_JSON_FAILED';
export const ACCOUNT_CUSTOM_JSON_COMPLETED = 'ACCOUNT_CUSTOM_JSON_COMPLETED';
export const ACCOUNT_CUSTOM_OPS_STARTED = 'ACCOUNT_CUSTOM_OPS_STARTED';
export const ACCOUNT_CUSTOM_OPS_RESOLVED = 'ACCOUNT_CUSTOM_OPS_RESOLVED';
export const ACCOUNT_CUSTOM_OPS_FAILED = 'ACCOUNT_CUSTOM_OPS_FAILED';
export const ACCOUNT_CUSTOM_OPS_COMPLETED = 'ACCOUNT_CUSTOM_OPS_COMPLETED';
export const ACCOUNT_DATA_MINIMUM_ACCOUNT_DELEGATION = 'ACCOUNT_DATA_MINIMUM_ACCOUNT_DELEGATION';
export const ACCOUNT_DATA_UPDATE = 'ACCOUNT_DATA_UPDATE';
export const ACCOUNT_DATA_UPDATE_FAILED = 'ACCOUNT_DATA_UPDATE_FAILED';
export const ACCOUNT_DATA_UPDATE_PENDING = 'ACCOUNT_DATA_UPDATE_PENDING';
export const ACCOUNT_DATA_VESTING_DELEGATIONS_UPDATE_PENDING = 'ACCOUNT_DATA_VESTING_DELEGATIONS_UPDATE_PENDING';
export const ACCOUNT_DATA_VESTING_DELEGATIONS_UPDATE_FAILED = 'ACCOUNT_DATA_VESTING_DELEGATIONS_UPDATE_FAILED';
export const ACCOUNT_DATA_VESTING_DELEGATIONS_UPDATE = 'ACCOUNT_DATA_VESTING_DELEGATIONS_UPDATE';
export const ACCOUNT_DATA_WITHDRAW_ROUTES_UPDATE_PENDING = 'ACCOUNT_DATA_WITHDRAW_ROUTES_UPDATE_PENDING';
export const ACCOUNT_DATA_WITHDRAW_ROUTES_UPDATE_FAILED = 'ACCOUNT_DATA_WITHDRAW_ROUTES_UPDATE_FAILED';
export const ACCOUNT_DATA_WITHDRAW_ROUTES_UPDATE = 'ACCOUNT_DATA_WITHDRAW_ROUTES_UPDATE';
export const ACCOUNT_GET_TRANSACTIONS = 'ACCOUNT_GET_TRANSACTIONS';
export const ACCOUNT_GET_TRANSACTIONS_RESOLVED = 'ACCOUNT_GET_TRANSACTIONS_RESOLVED';
export const ACCOUNT_DELEGATE_VESTING_SHARES_STARTED = 'ACCOUNT_DELEGATE_VESTING_SHARES_STARTED';
export const ACCOUNT_DELEGATE_VESTING_SHARES_RESOLVED = 'ACCOUNT_DELEGATE_VESTING_SHARES_RESOLVED';
export const ACCOUNT_DELEGATE_VESTING_SHARES_FAILED = 'ACCOUNT_DELEGATE_VESTING_SHARES_FAILED';
export const ACCOUNT_DELEGATE_VESTING_SHARES_COMPLETED = 'ACCOUNT_DELEGATE_VESTING_SHARES_COMPLETED';
export const ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_STARTED = 'ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_STARTED';
export const ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_FAILED = 'ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_FAILED';
export const ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_RESOLVED = 'ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_RESOLVED';
export const ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_COMPLETED = 'ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_COMPLETED';
export const ACCOUNT_SET_VOTING_PROXY_STARTED = 'ACCOUNT_SET_VOTING_PROXY_STARTED';
export const ACCOUNT_SET_VOTING_PROXY_FAILED = 'ACCOUNT_SET_VOTING_PROXY_FAILED';
export const ACCOUNT_SET_VOTING_PROXY_RESOLVED = 'ACCOUNT_SET_VOTING_PROXY_RESOLVED';
export const ACCOUNT_SET_VOTING_PROXY_COMPLETED = 'ACCOUNT_SET_VOTING_PROXY_COMPLETED';
export const ACCOUNT_VOTE_WITNESS_STARTED = 'ACCOUNT_VOTE_WITNESS_STARTED';
export const ACCOUNT_VOTE_WITNESS_FAILED = 'ACCOUNT_VOTE_WITNESS_FAILED';
export const ACCOUNT_VOTE_WITNESS_RESOLVED = 'ACCOUNT_VOTE_WITNESS_RESOLVED';
export const ACCOUNT_VOTE_WITNESS_COMPLETED = 'ACCOUNT_VOTE_WITNESS_COMPLETED';
export const ACCOUNT_VESTING_WITHDRAW_COMPLETED = 'ACCOUNT_VESTING_WITHDRAW_COMPLETED';
export const ACCOUNT_VESTING_WITHDRAW_STARTED = 'ACCOUNT_VESTING_WITHDRAW_STARTED';
export const ACCOUNT_VESTING_WITHDRAW_FAILED = 'ACCOUNT_VESTING_WITHDRAW_FAILED';
export const ACCOUNT_VESTING_WITHDRAW_RESOLVED = 'ACCOUNT_VESTING_WITHDRAW_RESOLVED';
export const ACCOUNT_POWER_UP_COMPLETED = 'ACCOUNT_POWER_UP_COMPLETED';
export const ACCOUNT_POWER_UP_STARTED = 'ACCOUNT_POWER_UP_STARTED';
export const ACCOUNT_POWER_UP_FAILED = 'ACCOUNT_POWER_UP_FAILED';
export const ACCOUNT_POWER_UP_RESOLVED = 'ACCOUNT_POWER_UP_RESOLVED';
export const ACCOUNT_TRANSFER_STARTED = 'ACCOUNT_TRANSFER_STARTED';
export const ACCOUNT_TRANSFER_FAILED = 'ACCOUNT_TRANSFER_FAILED';
export const ACCOUNT_TRANSFER_RESOLVED = 'ACCOUNT_TRANSFER_RESOLVED';
export const ACCOUNT_TRANSFER_COMPLETED = 'ACCOUNT_TRANSFER_COMPLETED';
export const ACCOUNT_TRANSFER_FROM_SAVINGS_STARTED = 'ACCOUNT_TRANSFER_FROM_SAVINGS_STARTED';
export const ACCOUNT_TRANSFER_FROM_SAVINGS_FAILED = 'ACCOUNT_TRANSFER_FROM_SAVINGS_FAILED';
export const ACCOUNT_TRANSFER_FROM_SAVINGS_RESOLVED = 'ACCOUNT_TRANSFER_FROM_SAVINGS_RESOLVED';
export const ACCOUNT_TRANSFER_FROM_SAVINGS_COMPLETED = 'ACCOUNT_TRANSFER_FROM_SAVINGS_COMPLETED';
export const ACCOUNT_TRANSFER_TO_SAVINGS_STARTED = 'ACCOUNT_TRANSFER_TO_SAVINGS_STARTED';
export const ACCOUNT_TRANSFER_TO_SAVINGS_FAILED = 'ACCOUNT_TRANSFER_TO_SAVINGS_FAILED';
export const ACCOUNT_TRANSFER_TO_SAVINGS_RESOLVED = 'ACCOUNT_TRANSFER_TO_SAVINGS_RESOLVED';
export const ACCOUNT_TRANSFER_TO_SAVINGS_COMPLETED = 'ACCOUNT_TRANSFER_TO_SAVINGS_COMPLETED';
export const ACCOUNT_CONTACTS_ADD = 'ACCOUNT_CONTACTS_ADD';
export const ACCOUNT_CONTACTS_REMOVE = 'ACCOUNT_CONTACTS_REMOVE';

export function claimRewardBalance(wif: string, params: object) {
  return (dispatch: () => void) => {
    const { account, reward_hive, reward_hbd, reward_vests } = params;
    // let reward_hive = reward_hive.replace("HIVE", "STEEM");
    // let reward_hbd = reward_hbd.replace("HBD", "SBD");
    const ops = [
      ['claim_reward_balance', {
        account,
        reward_hive,
        reward_hbd,
        reward_vests
      }]
    ];
    console.error(JSON.stringify(ops))
    hive.broadcast.send({
      operations: ops,
      extensions: []
    }, {
      posting: wif
    }, () => {
      dispatch(ProcessingActions.processingRewardClaimComplete());
      dispatch(refreshAccountData([account]));
    });
    dispatch(ProcessingActions.processingRewardClaim());
  };
}

// This function automatically attempts to use the minimal account creation fee
// and delegation amount.
export function createAccountDelegated(wif: string, params: object, preferences = {}) {
  return (dispatch: () => void) => {
    // const { creator, username, password } = params;
    // let client
    // if(preferences && preferences.hived_node) {
    //   client = new Client(preferences.hived_node);
    // } else {
    //   client = new Client('https://api.hive.blog');
    // }
    // const dsteem = require('dsteem');
    // const creatorKey = dhive.PrivateKey.fromString(wif);
    dispatch(ProcessingActions.processingAccountCreate());
    // client.broadcast.createAccount({
    //   creator, username, password
    // }, creatorKey).then(function(result) {
      dispatch(ProcessingActions.processingAccountCreateComplete());
    //   client.disconnect()
    // }, function(error) {
    //   dispatch(ProcessingActions.processingAccountCreateFailed(error));
    // });
  };
}

export function getMinimumAccountDelegation(preferences = {}) {
  return async dispatch => {
    // let client
    // if(preferences && preferences.hived_node) {
    //   client = new Client(preferences.hived_node);
    // } else {
    //   client = new Client('https://api.hive.blog');
    // }
    // const constants = await client.database.getConfig();
    // const chainProps = await client.database.getChainProperties();
    // const dynamicProps = await client.database.getDynamicGlobalProperties();

    // const creationFee = Asset.from(chainProps.account_creation_fee);
    // const sharePrice = Praiice.from({
    //   base: dynamicProps.total_vesting_shares,
    //   quote: dynamicProps.total_vesting_fund_hive
    // });

    // const ratio = constants.HIVE_CREATE_ACCOUNT_DELEGATION_RATIO;
    // const modifier = constants.HIVE_CREATE_ACCOUNT_WITH_HIVE_MODIFIER;

    // const fee = Asset.from('0.200 HIVE');

    // const targetDelegation = sharePrice.convert(creationFee.multiply(modifier * ratio));
    // const delegation = targetDelegation.subtract(sharePrice.convert(fee.multiply(ratio)));
    // const sp = sharePrice.convert(delegation);
    // client.disconnect();
    dispatch({
      type: ACCOUNT_DATA_MINIMUM_ACCOUNT_DELEGATION,
      payload: { }
    });
  };
}

export function getVestingDelegations(account: string) {
  return (dispatch: () => void) => {
    dispatch({
      type: ACCOUNT_DATA_VESTING_DELEGATIONS_UPDATE_PENDING
    });
    hive.api.getVestingDelegations(account, -1, 100, (err, results) => {
      if (err) {
        dispatch({
          type: ACCOUNT_DATA_VESTING_DELEGATIONS_UPDATE_FAILED,
          payload: err
        });
      } else {
        const payload = {};
        payload[account] = results;
        dispatch({
          type: ACCOUNT_DATA_VESTING_DELEGATIONS_UPDATE,
          payload
        });
      }
    });
  };
}

export function getTransactionsResolved(payload = {}) {
  return {
    type: ACCOUNT_GET_TRANSACTIONS_RESOLVED,
    payload: payload
  }
}

export function getTransactions(accounts: Array) {
  return async dispatch => {
    // const { category, author, permlink } = params;
    const response = await fetch(`http://localhost:5001`);
    if (response.ok) {
      const result = await response.json()
      let payload = {
        transactions: result.data
      }
      // if(result.forum) {
      //   payload.breadcrumb.unshift({
      //     name: result.forum.name,
      //     link: `/forum/${result.forum._id}`
      //   })
      // }
      // dispatch({
      //   type: types.SET_STATUS,
      //   payload: {
      //     network: result.network
      //   }
      // })
      dispatch(getTransactionsResolved(payload))
    } else {
      console.error(response.status);
      // dispatch(fetchPostResolved())
    }
  };
}

export function getWithdrawRoutes(account: string) {
  return (dispatch: () => void) => {
    dispatch({
      type: ACCOUNT_DATA_WITHDRAW_ROUTES_UPDATE_PENDING
    });
    hive.api.getWithdrawRoutes(account, 'outgoing', (err, results) => {
      if (err) {
        dispatch({
          type: ACCOUNT_DATA_WITHDRAW_ROUTES_UPDATE_FAILED,
          payload: err
        });
      } else {
        const payload = {};
        payload[account] = results;
        dispatch({
          type: ACCOUNT_DATA_WITHDRAW_ROUTES_UPDATE,
          payload
        });
      }
    });
  };

}

export function refreshAccountData(accounts: Array) {
  return (dispatch: () => void) => {
    dispatch({
      type: ACCOUNT_DATA_UPDATE_PENDING
    });
    hive.api.getAccounts(accounts, (err, results) => {
      if (err) {
        dispatch({
          type: ACCOUNT_DATA_UPDATE_FAILED,
          payload: err
        });
      } else {
        const payload = {};
        results.forEach((data) => {
          payload[data.name] = data;
          // If we have withdraw routes, update those as well
          if (data.withdraw_routes > 0) {
            dispatch(getWithdrawRoutes(data.name));
          }
          // If we have delegated HP, update that data
          if (data.delegated_vesting_shares !== "0.000000 VESTS") {
            dispatch(getVestingDelegations(data.name));
          }
        });
        dispatch({
          type: ACCOUNT_DATA_UPDATE,
          payload
        });
      }
    });
  };
}

export function transfer(wif, params) {
  return (dispatch: () => void) => {
    var { from, to, amount, memo } = params;
    // amount = amount.replace("HIVE", "STEEM");
    // amount = amount.replace("HBD", "SBD");
    dispatch({
      type: ACCOUNT_TRANSFER_STARTED
    });
    hive.broadcast.transfer(wif, from, to, amount, memo, (err, result) => {
      if (err) {
        dispatch({
          type: ACCOUNT_TRANSFER_FAILED,
          payload: err
        });
      } else {
        refreshAccountData([from, to]);
        dispatch({
          type: ACCOUNT_TRANSFER_RESOLVED
        });
      }
    });
  };
}

export function transferCompleted() {
  return {
    type: ACCOUNT_TRANSFER_COMPLETED,
  }
}

export function transferFromSavings(wif, params) {
  return (dispatch: () => void) => {
    var { from, requestId, to, amount, memo } = params;
    // amount = amount.replace("HIVE", "STEEM");
    // amount = amount.replace("HBD", "SBD");
    dispatch({
      type: ACCOUNT_TRANSFER_FROM_SAVINGS_STARTED
    });
    hive.broadcast.transferFromSavings(wif, from, requestId, to, amount, memo, (err, result) => {
      if (err) {
        dispatch({
          type: ACCOUNT_TRANSFER_FROM_SAVINGS_FAILED,
          payload: err
        });
      } else {
        refreshAccountData([from, to]);
        dispatch({
          type: ACCOUNT_TRANSFER_FROM_SAVINGS_RESOLVED
        });
      }
    });
  };
}

export function transferFromSavingsCompleted() {
  return {
    type: ACCOUNT_TRANSFER_FROM_SAVINGS_COMPLETED,
  }
}

export function transferToSavings(wif, params) {
  return (dispatch: () => void) => {
    var { from, to, amount, memo } = params;
    // amount = amount.replace("HIVE", "STEEM");
    // amount = amount.replace("HBD", "SBD");
    dispatch({
      type: ACCOUNT_TRANSFER_TO_SAVINGS_STARTED
    });
    hive.broadcast.transferToSavings(wif, from, to, amount, memo, (err, result) => {
      if (err) {
        dispatch({
          type: ACCOUNT_TRANSFER_TO_SAVINGS_FAILED,
          payload: err
        });
      } else {
        refreshAccountData([from, to]);
        dispatch({
          type: ACCOUNT_TRANSFER_TO_SAVINGS_RESOLVED
        });
      }
    });
  };
}

export function transferToSavingsCompleted() {
  return {
    type: ACCOUNT_TRANSFER_TO_SAVINGS_COMPLETED,
  }
}

export function setDelegateVestingShares(wif, params) {
  return (dispatch: () => void) => {
    const { delegator, delegatee, vestingShares } = params;
    dispatch({
      type: ACCOUNT_DELEGATE_VESTING_SHARES_STARTED
    });
    const formattedVestingShares = [parseFloat(vestingShares).toFixed(6), 'VESTS'].join(' ');
    hive.broadcast.delegateVestingShares(wif, delegator, delegatee, formattedVestingShares, (err, result) => {
      if (err) {
        dispatch({
          type: ACCOUNT_DELEGATE_VESTING_SHARES_FAILED,
          payload: err
        });
      } else {
        dispatch(refreshAccountData([delegator]));
        dispatch({
          type: ACCOUNT_DELEGATE_VESTING_SHARES_RESOLVED
        });
      }
    });
  };
}

export function setDelegateVestingSharesCompleted() {
  return {
    type: ACCOUNT_DELEGATE_VESTING_SHARES_COMPLETED,
  }
}

export function setWithdrawVestingRoute(wif, params) {
  return (dispatch: () => void) => {
    const { account, target, percent, autoVest } = params;
    dispatch({
      type: ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_STARTED
    });
    hive.broadcast.setWithdrawVestingRoute(wif, account, target, percent * 100, autoVest, (err, result) => {
      if (err) {
        dispatch({
          type: ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_FAILED,
          payload: err
        });
      } else {
        dispatch(refreshAccountData([account]));
        dispatch({
          type: ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_RESOLVED
        });
      }
    });
  };
}

export function setWithdrawVestingRouteCompleted() {
  return {
    type: ACCOUNT_SET_WITHDRAW_VESTING_ROUTE_COMPLETED,
  }
}

export function setVotingProxy(wif, params) {
  return (dispatch: () => void) => {
    const { account, proxy } = params;
    dispatch({
      type: ACCOUNT_SET_VOTING_PROXY_STARTED
    });
    hive.broadcast.accountWitnessProxy(wif, account, proxy, (err, result) => {
      if (err) {
        dispatch({
          type: ACCOUNT_SET_VOTING_PROXY_FAILED,
          payload: err
        });
      } else {
        dispatch(refreshAccountData([account]));
        dispatch({
          type: ACCOUNT_SET_VOTING_PROXY_RESOLVED
        });
      }
    });
  };
}

export function setVotingProxyCompleted() {
  return {
    type: ACCOUNT_SET_VOTING_PROXY_COMPLETED,
  }
}

export function voteWitness(wif, params) {
  return (dispatch: () => void) => {
    const { account, witness, approve } = params;
    dispatch({
      type: ACCOUNT_VOTE_WITNESS_STARTED
    });
    hive.broadcast.accountWitnessVote(wif, account, witness, approve, (err, result) => {
      if (err) {
        dispatch({
          type: ACCOUNT_VOTE_WITNESS_FAILED,
          payload: err
        });
      } else {
        dispatch(refreshAccountData([account]));
        dispatch({
          type: ACCOUNT_VOTE_WITNESS_RESOLVED
        });
      }
    });
  }
}

export function voteWitnessCompleted() {
  return {
    type: ACCOUNT_VOTE_WITNESS_COMPLETED,
  }
}

export function withdrawVesting(wif, params) {
  return (dispatch: () => void) => {
    const { account, vests } = params;
    const vestsFormat = [vests, "VESTS"].join(" ");
    dispatch({
      type: ACCOUNT_VESTING_WITHDRAW_STARTED
    });
    hive.broadcast.withdrawVesting(wif, account, vestsFormat, (err, result) => {
      if (err) {
        dispatch({
          type: ACCOUNT_VESTING_WITHDRAW_FAILED,
          payload: err
        });
      } else {
        dispatch(refreshAccountData([account]));
        dispatch({
          type: ACCOUNT_VESTING_WITHDRAW_RESOLVED
        });
      }
    });
  };
}

export function withdrawVestingCompleted() {
  return {
    type: ACCOUNT_VESTING_WITHDRAW_COMPLETED,
  }
}

export function cancelWithdrawVesting(wif, params) {
  return (dispatch: () => void) => {
    const { account } = params;
    dispatch({
      type: ACCOUNT_VESTING_WITHDRAW_STARTED
    });
    hive.broadcast.withdrawVesting(wif, account, '0.000000 VESTS', (err, result) => {
      if (err) {
        dispatch({
          type: ACCOUNT_VESTING_WITHDRAW_FAILED,
          payload: err
        });
      } else {
        dispatch(refreshAccountData([account]));
        dispatch({
          type: ACCOUNT_VESTING_WITHDRAW_RESOLVED
        });
      }
    });
  };
}

export function powerUp(wif, params) {
  return (dispatch: () => void) => {
    const { from_account, to_account, hiveAmount } = params;
    const hiveFormat = [hiveAmount, "STEEM"].join(" ");
    dispatch({
      type: ACCOUNT_POWER_UP_STARTED
    });
    // fix
    hive.broadcast.transferToVesting(wif, from_account, to_account, hiveFormat, (err, result) => {
      if (err) {
        dispatch({
          type: ACCOUNT_POWER_UP_FAILED,
          payload: err
        });
      } else {
        dispatch(refreshAccountData([from_account]));
        dispatch({
          type: ACCOUNT_POWER_UP_RESOLVED
        });
      }
    });
  };
}

export function powerUpCompleted() {
  return {
    type: ACCOUNT_POWER_UP_COMPLETED,
  }
}

export function customJson(wif, params) {
  return (dispatch: () => void) => {
    const { account, id, json, permission } = params
    let auths = []
    let postingAuths = [account]
    if (permission === 'active') {
      auths = [account]
      postingAuths = []
    }
    dispatch({
      type: ACCOUNT_CUSTOM_JSON_STARTED
    })
    hive.broadcast.customJson(wif, auths, postingAuths, id, json, function(err, result) {
      if(result) {
        dispatch({
          type: ACCOUNT_CUSTOM_JSON_RESOLVED
        })
      }
      if(err) {
        dispatch({
          type: ACCOUNT_CUSTOM_JSON_FAILED,
          payload: err
        })
      }
    });
  };
}


export function customJsonCompleted() {
  return {
    type: ACCOUNT_CUSTOM_JSON_COMPLETED,
  }
}

export function send(wif, params) {
  return (dispatch: () => void) => {
    const { operations, extensions } = params
    console.log(operations, extensions)
    dispatch({
      type: ACCOUNT_CUSTOM_OPS_STARTED
    })
    hive.broadcast.send({ operations, extensions }, { posting: wif }, function(err, result) {
      if(result) {
        dispatch({
          type: ACCOUNT_CUSTOM_OPS_RESOLVED
        })
      }
      if(err) {
        dispatch({
          type: ACCOUNT_CUSTOM_OPS_FAILED,
          payload: err
        })
      }
    });
  };
}

export function addContact(username) {
  return (dispatch: () => void) => {
    dispatch({
      type: ACCOUNT_CONTACTS_ADD,
      payload: username
    })
  };
}

export function removeContact(username) {
  return (dispatch: () => void) => {
    dispatch({
      type: ACCOUNT_CONTACTS_REMOVE,
      payload: username
    })
  };
}
