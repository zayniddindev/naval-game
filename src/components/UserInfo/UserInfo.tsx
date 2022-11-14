import { Component as ReactComponent, ReactNode } from "react";

type UserInfoProps = {
    player: {
        name: string,
        score: number,
    }
}

export class UserInfo extends ReactComponent<UserInfoProps, any> {

    render(): ReactNode {
        return (
            <div className="userInfo">
                <p className="userName">{this.props.player.name}</p>
                <p className="userScore">Score: {this.props.player.score}</p>
            </div>
        )
    }
}