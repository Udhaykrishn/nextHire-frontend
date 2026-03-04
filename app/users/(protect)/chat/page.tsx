export default function ChatPage() {
  return (
    <div className="flex flex-1 h-[calc(100vh-8rem)] gap-4">
      {/* Chat List */}
      <div className="w-80 rounded-xl border bg-card flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-semibold">Messages</h2>
          <div className="relative mt-3">
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full rounded-lg border bg-background px-9 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex-1 overflow-auto">
          {/* Active chat */}
          <div className="p-3 bg-muted/50 border-l-2 border-blue-600 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                  G
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">Google HR</p>
                  <span className="text-xs text-muted-foreground">2m ago</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  Looking forward to meeting you...
                </p>
              </div>
            </div>
          </div>

          {/* Chat item */}
          <div className="p-3 hover:bg-muted/30 cursor-pointer border-b">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm">
                  M
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">Meta Recruiter</p>
                  <span className="text-xs text-muted-foreground">1h ago</span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  Thank you for your application...
                </p>
              </div>
              <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs">
                2
              </div>
            </div>
          </div>

          {/* Chat item */}
          <div className="p-3 hover:bg-muted/30 cursor-pointer border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold text-sm">
                A
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">Amazon Team</p>
                  <span className="text-xs text-muted-foreground">
                    Yesterday
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  Congratulations! We are pleased to...
                </p>
              </div>
            </div>
          </div>

          {/* Chat item */}
          <div className="p-3 hover:bg-muted/30 cursor-pointer border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-teal-500 flex items-center justify-center text-white font-bold text-sm">
                T
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">TechCorp HR</p>
                  <span className="text-xs text-muted-foreground">
                    2 days ago
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  Could you please share your...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 rounded-xl border bg-card flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
              G
            </div>
            <div>
              <p className="font-medium">Google HR</p>
              <p className="text-xs text-green-600">Online</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button type="button" className="p-2 rounded-lg hover:bg-muted">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </button>
            <button type="button" className="p-2 rounded-lg hover:bg-muted">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {/* Received message */}
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
              G
            </div>
            <div>
              <div className="bg-muted rounded-lg rounded-tl-none p-3 max-w-md">
                <p className="text-sm">
                  Hi! Thank you for applying to Google for the Senior Frontend
                  Developer position.
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">10:30 AM</p>
            </div>
          </div>

          {/* Received message */}
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
              G
            </div>
            <div>
              <div className="bg-muted rounded-lg rounded-tl-none p-3 max-w-md">
                <p className="text-sm">
                  We've reviewed your profile and would love to schedule an
                  interview with you. Are you available on December 10th at 3:00
                  PM IST?
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">10:31 AM</p>
            </div>
          </div>

          {/* Sent message */}
          <div className="flex gap-3 justify-end">
            <div>
              <div className="bg-blue-600 text-white rounded-lg rounded-tr-none p-3 max-w-md">
                <p className="text-sm">
                  Hello! Thank you so much for considering my application. I'm
                  very excited about the opportunity!
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-1 text-right">
                10:45 AM
              </p>
            </div>
          </div>

          {/* Sent message */}
          <div className="flex gap-3 justify-end">
            <div>
              <div className="bg-blue-600 text-white rounded-lg rounded-tr-none p-3 max-w-md">
                <p className="text-sm">
                  Yes, December 10th at 3:00 PM IST works perfectly for me.
                  Looking forward to the interview!
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-1 text-right">
                10:46 AM
              </p>
            </div>
          </div>

          {/* Received message */}
          <div className="flex gap-3">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shrink-0">
              G
            </div>
            <div>
              <div className="bg-muted rounded-lg rounded-tl-none p-3 max-w-md">
                <p className="text-sm">
                  Looking forward to meeting you! You'll receive a calendar
                  invite shortly with the meeting link. 🎉
                </p>
              </div>
              <p className="text-xs text-muted-foreground mt-1">2 min ago</p>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 border-t">
          <div className="flex gap-3">
            <button type="button" className="p-2 rounded-lg hover:bg-muted">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                />
              </svg>
            </button>
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 rounded-lg border bg-background px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
