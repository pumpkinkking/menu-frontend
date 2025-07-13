const Client = require('ssh2-sftp-client');
const path = require('path');

// 服务器配置信息，请用户根据实际情况修改
const config = {
  host: '106.52.97.177',       // 服务器IP地址
  port: 22,                     // SSH端口，默认22
  username: 'root',    // 服务器登录用户名
  password: 'Qly.shuai666',    // 服务器登录密码
  // privateKey: require('fs').readFileSync('/path/to/private/key'), // 如需使用密钥登录，请取消注释并配置密钥路径
};

// 本地构建文件目录和远程服务器目标目录
const localBuildDir = path.join(__dirname, 'dist/build/h5'); // 构建输出目录
const remoteDeployDir = '/var/www/menu-frontend'; // 服务器上的部署目录

// 创建SFTP客户端实例
const sftp = new Client();

// 执行部署流程
async function deploy() {
  try {
    console.log('开始连接服务器...');
    await sftp.connect(config);
    console.log('服务器连接成功，开始上传文件...');

    // 检查远程目录是否存在，不存在则创建
    const remoteDirExists = await sftp.exists(remoteDeployDir);
    if (!remoteDirExists) {
      console.log(`远程目录不存在，创建目录: ${remoteDeployDir}`);
      await sftp.mkdir(remoteDeployDir, true);
    }

    // 上传整个构建目录到服务器
    await sftp.uploadDir(localBuildDir, remoteDeployDir);
    console.log('文件上传完成！');

    // 关闭连接
    await sftp.end();
    console.log('部署成功！');
  } catch (err) {
    console.error('部署失败:', err);
    process.exit(1);
  }
}

// 执行部署
deploy();