const Config = [{
  path: '/protected',
  children: [{
    path: '/replication',
    title: '远程复制',
    icon: 'el-icon-location',
    children: [{
      path: '/replicationPair',
      title: '远程复制pair',
    }, {
      path: '/replicationConsistency',
      title: '远程复制一致性组',
    }]
  }, {
    path: '/dualActive',
    title: '双活复制',
    icon: 'el-icon-menu',
    children: [{
      path: '/dualActivePair',
      title: '双活复制pair',
    }, {
      path: '/dualActiveConsistency',
      title: '双活复制一致性组',
    }]
  }]
}, {
  path: '/provision',
  children: [{
    path: '/pool',
    title: '存储池',
    icon: 'el-icon-menu',
  }, {
    path: '/obs',
    title: 'OBS',
    icon: 'el-icon-menu',
    hidden: true,
  }, {
    path: '/host',
    title: '主机',
    icon: 'el-icon-menu',
  }, {
    path: '/hostGroup',
    title: '主机组',
    icon: 'el-icon-menu',
  }, {
    path: '/volume',
    title: '卷',
    icon: 'el-icon-menu',
  }]
}];

function setHiddenProperty(obj) {
    if(obj && !obj.hasOwnProperty('hidden')) {
        obj['hidden'] = false;
    }
}
const LeftTreeConfigFactory = (list) => {
    if(!list.length) return;
    list.forEach((item, index, arr) => {
        setHiddenProperty(arr[index]);
        if(item && item.children && item.children.length) {
            LeftTreeConfigFactory(item.children);
        }
    })
    return list;
}

const LeftTreeConfig = LeftTreeConfigFactory(Config);
console.log(LeftTreeConfig);
export default LeftTreeConfig;