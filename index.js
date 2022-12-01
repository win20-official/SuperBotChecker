const dotenv = require("dotenv")
dotenv.config()
const { Client, GatewayIntentBits, REST, Routes, ApplicationCommandOptionType } = require("discord.js")
const client = new Client({ intents: [GatewayIntentBits.Guilds] })

const LOGIN = process.env.TOKEN
const commands = [
  {
    name: "botcheck",
    description: "Check if a user is a bot",
    options: [
        {
          name: "user",
          description: "The required user.",
          required: true,
          type: ApplicationCommandOptionType.User
        }
    ]
  }
]

const rest = new REST({ version: "10" }).setToken(LOGIN)

;(async () => {
  try {
    console.log("Started refreshing application (/) commands.")

    await rest.put(Routes.applicationCommands("APP_ID"), {
      body: commands,
    })

    console.log("Successfully reloaded application (/) commands.")
  } catch (error) {
    console.error(error)
  }
})()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return

  if (interaction.commandName === "botcheck") {
    const username = interaction.options.getUser("user")
    const text = "is not a bot."

    if (username.bot === false) {
      await interaction.reply(`See the DM i've sent you ${interaction.user}`)
      await interaction.user.send(`The user ${username} ${text}`)
    } else {
      const text = "is a bot."
      await interaction.reply(`See the DM i've sent you ${interaction.user}`)
      await interaction.user.send(`The user ${username} ${text}`)
    }

  }
})

client.login(LOGIN)