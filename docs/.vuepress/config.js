module.exports = {
	title: '你好世界',
	description: '让我们一起探索这个未知的世界，Hello, World!',
	dest: 'public/devtools',
	plugins: [
		[
			'vuepress-plugin-yuque', {
				repoUrl: 'https://www.yuque.com/bobit/devtools',
				home: {
					actionText: '关于 →',
					actionLink: '/about/',
					//heroImage: 'https://cdn.nlark.com/yuque/0/2018/png/84868/1535520500482-avatar/20c595c5-ab31-4543-9142-f36cc87c8868.png?x-oss-process=image/resize,m_fill,w_320,h_320',
					footer: 'Copyright © 2019 zhangbo.fun All rights reserved. 京ICP备15042531号-4',
					features: [
							  { title: '点滴记忆', details: '匆忙生活中，总会遗忘些许值得记忆的时刻，在此主要记录个人点滴记忆。' },
							  { title: '探索创新', details: '让我们一起探索这个未知的世界，Hello, World!' },
							],
				}
						
			}
		]
	]
}
