import { init, checkIfexists } from './dao/swungoverDao';

init();
checkIfexists('The 1947 Harvest Moon Ball').then(r => console.log('rows', r)).catch(e => console.log('error', e));
