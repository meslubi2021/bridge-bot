import { TextChannel } from "discord.js";
import { Event } from "../../../interfaces/Event";
import fetchHypixelGuild from "../../../util/requests/fetchHypixelGuild";
import fetchMojangProfile from "../../../util/requests/fetchMojangProfile";
import isFetchError from "../../../util/requests/isFetchError";

export default {
	name: "chat:whisper",
	runOnce: false,
	run: async (bot, playerName: string, message: string) => {
		if (message.toLowerCase().startsWith("join" || "tournament" || "register" || "tourney")) {
			await (bot.discord.channels.cache.get("995070669991723109") as TextChannel).send(playerName);
			bot.executeCommand(`/w ${playerName} You have been signed up for the event!`);
			return;
		}

		const errorMessage = `/w ${playerName} There was an error attempting your request! (Check spelling and/or try again later)`;
		const target = message.startsWith("weeklygexp" || "weeklygxp") ? playerName : (message.split(" ")[0] as string);
		const mojangProfile = await fetchMojangProfile(target);

		if (isFetchError(mojangProfile)) {
			return bot.executeCommand(errorMessage);
		}

		const playerGuild = await fetchHypixelGuild(mojangProfile.id);
		if (isFetchError(playerGuild)) {
			return bot.executeCommand(errorMessage);
		}

		const member = playerGuild.members.find((guildMember) => guildMember.uuid === mojangProfile.id);
		bot.executeCommand(
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			`/w ${playerName} ${target}'s total weekly gexp: ${Object.values(member!.expHistory).reduce(
				(previous, current) => previous + current,
			)}`,
		);
	},
} as Event;
