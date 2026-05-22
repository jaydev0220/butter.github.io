import type { JoinFaq, JoinResource, JoinStep } from '$lib/types';

export const JOIN_INVITE_CODE = '8TER';

export const joinSteps: JoinStep[] = [
	{
		id: 'register',
		title: '註冊新的 Bybit 帳戶',
		description: '請使用指定邀請連結註冊新的 Bybit 帳戶，並確認註冊時綁定邀請碼。',
		action: {
			label: '開啟註冊連結',
			href: 'https://partner.bybit.com/b/8TER'
		},
		note: {
			title: '注意事項',
			items: [
				`請確認註冊時綁定邀請碼：${JOIN_INVITE_CODE}。`,
				'建議使用尚未註冊過 Bybit 的 Email 或手機號碼。',
				'若您已經有 Bybit 帳戶，請先確認是否需要進行身分轉移。'
			]
		}
	},
	{
		id: 'kyc',
		title: '完成 KYC 與入金',
		description: '註冊完成後，請在 Bybit 帳戶內完成必要的資格與安全設定。',
		note: {
			title: '需完成項目',
			ordered: true,
			items: ['KYC 身分驗證', '帳戶安全設定', '入金流程']
		}
	},
	{
		id: 'uid',
		title: '查詢您的 Bybit UID',
		description:
			'完成註冊、KYC 與入金後，請登入 Bybit 查詢您的 UID。請確認 UID 正確，避免影響資格審核。',
		note: {
			title: 'UID 查詢方式',
			ordered: true,
			items: ['登入 Bybit 帳戶', '進入個人帳戶頁面', '找到 UID / User ID', '複製完整 UID']
		}
	},
	{
		id: 'discord',
		title: '加入 Discord 並留言 UID',
		description:
			'加入 Discord 後，到指定 UID 專區完成留言驗證。若填錯或留言錯 UID，請在 Discord UID 專區重新留言並註明。',
		action: {
			label: '加入 Discord',
			href: 'https://discord.gg/dumbmoney'
		}
	}
];

export const joinResources: JoinResource[] = [
	{
		label: 'Community',
		title: '笨錢社群 LINE 群',
		description: '用於接收社群通知與補充交流資訊。',
		buttonLabel: '加入 LINE 群',
		href: 'https://line.me/ti/g2/6JoThj6nR5WJraE-yYm5CVjZiuVZos-L7utDzg'
	},
	{
		label: 'Course',
		title: '實體課程報名',
		description: '查看可報名的實體課程與相關活動。',
		buttonLabel: '查看報名連結',
		href: 'https://luma.com/dumbmoney'
	},
	{
		label: 'Video',
		title: '線上課程影片',
		description: '課程影片皆為免費且公開，可先開始學習。',
		buttonLabel: '觀看課程影片',
		href: 'https://youtu.be/dlJ5NZxDvbw'
	}
];

export const joinFaqs: JoinFaq[] = [
	{
		id: 'existing-account',
		question: '我已經有 Bybit 帳戶，還可以加入嗎？',
		answer: '可以，但請先確認原帳戶是否已綁定其他邀請人。若需要轉移身分，請參考身分轉移教學影片。',
		action: {
			label: '觀看身分轉移教學',
			href: 'https://www.youtube.com/shorts/vr_uPuLYUv8'
		}
	},
	{
		id: 'wrong-uid',
		question: '我填錯或留言錯 UID 怎麼辦？',
		answer: '請在 Discord UID 專區重新留言並註明。建議重新複製完整 UID，避免缺漏或多輸入空格。'
	},
	{
		id: 'kyc-deposit',
		question: '沒有完成 KYC 或入金可以加入嗎？',
		answer: '課程影片皆為免費且公開。若您想與其他學員交流討論，您必須完成 KYC 與入金才能加入社群。'
	}
];
