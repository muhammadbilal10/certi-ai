'use client'
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";


export default function BotChat({ id }: { id: number }) {
    const pathName = usePathname();
    const [check, setCheck] = useState(false);
    useEffect(() => {
        if (pathName === `/dashboard/test-result/${id}`) {
            setCheck(true);
        }
        else {
            setCheck(false);
        }
    }, [check])

    return (
        <div>
            {
                check && <script
                    async
                    src="https://api.cronbot.ai/v1/widgets/app/app_dqxltxzqsal5"
                ></script>
            }
        </div>
    )
}