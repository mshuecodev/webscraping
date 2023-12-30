const axios = require("axios")
const cheerio = require("cheerio")
const puppeteer = require("puppeteer")

const fetchHTML = async (url) => {
	const { data } = await axios.get(url)
	return cheerio.load(data)
}

const scrapeData = async (url) => {
	const browser = await puppeteer.launch()
	const page = await browser.newPage()
	await page.goto(url)

	const content = await page.content()
	const $ = cheerio.load(content)

	const data = []

	console.log("img", $("div").find("a > img").length)
	console.log("title", $("div").find(".text-gray-800 > a").length)
	console.log("status", $("div > .text-yellow-700").length)
	console.log("appnumber", $("div > .space-y-1 > .space-x-3 > .text-gray-700").length)
	console.log("classcode", $("div > .space-y-1 > .text-sm.text-gray-700").length)
	console.log("desc", $("div > .space-y-1 > .text-sm.text-gray-700.overflow-y-hidden").length)

	console.log("card", $("div > .space-y-2.p-6.bg-white.border.border-gray-400.rounded-2xl.cursor-pointer").length)

	$("div > .space-y-2.p-6.bg-white.border.border-gray-400.rounded-2xl.cursor-pointer").each((index, element) => {
		let img = $(element).find("a > img").attr("src")
		let title = $(element).find(".text-gray-800 > a").text()
		let status = $(element).find("div > .text-yellow-700").text()
		let appnumber = $(element).find("div > .space-y-1 > .space-x-3 > .text-gray-700").text()
		let classcode = $(element).find("div > .space-y-1 > .text-sm.text-gray-700").text()
		let desc = $(element).find("div > .space-y-1 > .text-sm.text-gray-700.overflow-y-hidden").text()

		data.push({ img, title, status, appnumber, classcode, desc })
	})

	console.log("data", data)

	return data
}

;(async () => {
	let url = "https://pdki-indonesia.dgip.go.id/search?type=trademark&keyword=&page=1&showFilter=true"
	const movies = await scrapeData(url)
	console.log("movies", movies)
})()
