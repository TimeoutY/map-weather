import type { IApi } from 'umi';
export default (api: IApi) => {
  api.addHTMLScripts(() => ({
    type: 'text/javascript',
    src: '//api.map.baidu.com/api?type=webgl&v=1.0&ak=f5LWoygEzO1f4Kv7dUieRmeDnrbzKZ6i',
  }));
};