import type { IApi } from '@umijs/max';
export default (api: IApi) => {
  api.addHTMLScripts(() => ({
    type: 'text/javascript',
    src: '百度地图链接',
  }));
};