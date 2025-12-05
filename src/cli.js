#!/usr/bin/env node

const { program } = require('commander');
const { execSync } = require('node:child_process');

program
  .name('port')
  .description('포트 확인 및 프로세스 종료 CLI 도구')

program
  .command('ls')
  .description('모든 사용 중인 포트 목록 보기')
  .action(() => {
    try {
      const command = 'lsof -i -P -n | grep LISTEN';
      const output = execSync(command, { encoding: 'utf-8' });

      if (!output.trim()) {
        console.log('사용 중인 포트가 없습니다.');
        return;
      }

      const lines = output.trim().split('\n');
      console.log('\n포트 정보:');
      console.log('─'.repeat(80));
      console.log('PID\t\t포트\t\t프로세스');
      console.log('─'.repeat(80));

      for (const line of lines) {
        const parts = line.trim().split(/\s+/);
        if (parts.length >= 2) {
          const pid = parts[1];
          const name = parts[0];
          const portMatch = line.match(/:(\d+)/);
          const port = portMatch ? portMatch[1] : 'N/A';
          console.log(`${pid}\t\t${port}\t\t${name}`);
        }
      }
      console.log('─'.repeat(80));
    } catch (error) {
      if (error.status === 1) {
        console.log('사용 중인 포트가 없습니다.');
      } else {
        console.error('오류 발생:', error.message);
      }
    }
  });

// 특정 포트 확인
program
  .command('check <port>')
  .description('특정 포트 확인')
  .action((port) => {
    try {
      const command = `lsof -i :${port} -P -n`;
      const output = execSync(command, { encoding: 'utf-8' });

      if (!output.trim()) {
        console.log(`포트 ${port}는 사용 중이 아닙니다.`);
        return;
      }

      const lines = output.trim().split('\n');
      console.log(`\n포트 ${port} 사용 정보:`);
      console.log('─'.repeat(80));

      for (const [index, line] of lines.entries()) {
        if (index === 0) {
          console.log(line);
        } else {
          const parts = line.trim().split(/\s+/);
          if (parts.length >= 2) {
            const pid = parts[1];
            const name = parts[0];
            const user = parts[2] || 'N/A';
            console.log(`PID: ${pid}, 프로세스: ${name}, 사용자: ${user}`);
          }
        }
      }
      console.log('─'.repeat(80));
    } catch (error) {
      if (error.status === 1) {
        console.log(`포트 ${port}는 사용 중이 아닙니다.`);
      } else {
        console.error('오류 발생:', error.message);
      }
    }
  });

// 포트를 사용하는 프로세스 종료
program
  .command('kill <port>')
  .description('특정 포트를 사용하는 프로세스 종료')
  .action((port) => {
    try {
      // 먼저 포트 확인
      const checkCommand = `lsof -ti :${port}`;
      const pids = execSync(checkCommand, { encoding: 'utf-8' }).trim();

      if (!pids) {
        console.log(`포트 ${port}를 사용하는 프로세스가 없습니다.`);
        return;
      }

      const pidArray = pids.split('\n').filter((pid) => pid.trim());

      console.log(
        `포트 ${port}를 사용하는 프로세스 발견: ${pidArray.join(', ')}`
      );

      // 프로세스 종료
      for (const pid of pidArray) {
        try {
          execSync(`kill -15 ${pid}`);
          console.log(`프로세스 ${pid} 종료 완료`);
        } catch (killError) {
          console.error(`프로세스 ${pid} 종료 실패:`, killError.message);
        }
      }

      // 종료 확인
      setTimeout(() => {
        try {
          execSync(checkCommand, { encoding: 'utf-8' });
          console.log('⚠️  일부 프로세스가 아직 실행 중일 수 있습니다.');
        } catch {
          console.log('✅ 모든 프로세스가 종료되었습니다.');
        }
      }, 500);
    } catch (error) {
      if (error.status === 1) {
        console.log(`포트 ${port}를 사용하는 프로세스가 없습니다.`);
      } else {
        console.error('오류 발생:', error.message);
      }
    }
  });

program.parse();
