import { H1 } from "app/ui/typography";
import { View } from "app/ui/view";
import React from "react";

type HomeScreenProps = {};

const HomeScreen: React.FC<HomeScreenProps> = () => {
	return (
		<View className="flex-1 items-center justify-center bg-green-800">
			<H1 className="text-white">T3 Solito Template</H1>
		</View>
	);
};

export default HomeScreen;
