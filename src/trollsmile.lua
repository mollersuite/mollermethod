local API = ...
local Players = game:GetService('Players')
local prefix = '['
local Commands = {}

--[[
QQQQHH                             QQQHH
QQQQHHW                           WQQQHH
QQQQQQHm                         HHQQQHH
QQQQ WHHm                       HQH HHHH
QQQQ  HQHv                     HHH' HHHH
QQQQ   HHH1                   WHH"  HHHH
QQQQ    HQH                  5HH]   HHHH               tHHHHHHHHHHHHW
QQQQ     HHW                CHHG    HHHH            _HHHH'        ~HHHHt
QQQQ     !HHH              ;HHm     HHHH           HHHm              WHHH~
QQQQ      >HHH            ~HHH      HHHH         !HQH;                >HQH'
QQQQ       5HHW          `HQH       HHHH         HHQv                  HQHH
QQQQ        GHQm         HHH        HHHH        5HHQ                   .QHH"
QQQQ         mHHG       HHH         HHHH        HHHQ                    QHHm
QQQQ          HHQv     HHH          HHHH        HHHQ                    QHH>
QQQQ           HQH~   HHH;          HHHH        vHHQ                   ]QHH
QQQQ            HHH  GHHC           HHHH         HHQW                  HQHv
QQQQ             HHHHHHe            HHHH          HWHH                HHHC
QQQQ             .WHQHG             HHHH           ]HHHG            WWHW
QQQQ              ~HHH              HHHH             1HHHHHHGCtGHHHHHe
                                                          _tGWWe1

			trollsmile is made of mollybdenum - ©️ 2022 Mollybdenum GP
]]

Players.LocalPlayer.Chatted:Connect(function(message, recipient)
	if message:sub(1, 2) == '/e' then
		message = message:sub(4)
	end
	if message:sub(1, #prefix) == prefix then
		local cmd = message:sub(#prefix + 1)

		local args = string.split(cmd, ' ')
		local command = args[1]
		if command then
			table.remove(args, 1)
			local cmd = Commands[command]
			if cmd then
				local success, err = pcall(cmd, args)
				if not success then
					warn('[mollermethod] command error: ' .. err)
				end
			else
				warn('[mollermethod] Unknown command: ' .. command)
			end
		end
	end
end)

function Commands.help()
	print('[mollermethod] Commands:')
	for cmd, func in pairs(Commands) do
		print('[mollermethod] ' .. cmd)
	end
end

function Commands.support()
	API.notify{
		Text = 'Join https://mthd.ml/support',
		App = 'mollermethod'
	}

	local req =
		syn and syn.request or http and http.request or http_request or fluxus and fluxus.request or getgenv().request or request
	if req then
		req({
			Url = 'http://127.0.0.1:6463/rpc?v=1',
			Method = 'POST',
			Headers = {
				['Content-Type'] = 'application/json',
				Origin = 'https://discord.com'
			},
			Body = game:GetService'HttpService':JSONEncode({
				cmd = 'INVITE_BROWSER',
				nonce = game:GetService'HttpService':GenerateGUID(false),
				args = { code = '9c8fFSy83p' }
			})
		})
	end
end

function Commands.credit()
	warn'[mollermethod] Credits:'
	print'[mollermethod] support command taken from IY'
	print'[mollermethod] help command, command parser written by GitHub Copilot'
	print'[mollermethod] everything else is made of mollybdenum'
end

return Commands