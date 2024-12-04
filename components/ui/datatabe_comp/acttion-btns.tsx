"use client";

import React from "react";

// Definicja typu dla pojedynczej akcji
type Action = {
	label: string;
	onClick: () => void;
};

// Definicja typu dla props
interface ActionButtonsProps {
	actions: Action[];
}

// Uniwersalny komponent ActionButtons
const ActionButtons: React.FC<ActionButtonsProps> = ({ actions }) => {
	return (
		<div>
			{actions.map((action, index) => (
				<button key={index} onClick={action.onClick}>
					{action.label}
				</button>
			))}
		</div>
	);
};

export default ActionButtons;
