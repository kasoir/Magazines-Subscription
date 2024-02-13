import { Controller, Post, Put, Body, Param, Get } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { ApiTags, ApiOperation, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Subscription Controller')
@Controller('subscriptions')
export class SubscriptionController {
    constructor(
        private readonly subscriptionService: SubscriptionService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get all subscriptions' })
    getSubscription() {
        return this.subscriptionService.getSubscription();
    }

    @Post()
    @ApiOperation({ summary: 'Subscribe to a magazine' })
    @ApiBody({ description: 'The subscription details', type: 'object', required: true })
    subscribe(@Body('userId') userId: number, @Body('magazineId') magazineId: number, @Body('magazineId') magazineName: string) {
        return this.subscriptionService.subscribe(userId, magazineId, magazineName);
    }

    @Put(':id/cancel')
    @ApiOperation({ summary: 'Cancel a subscription' })
    @ApiParam({ name: 'id', required: true, description: 'The id of the subscription to cancel' })
    cancelSubscription(@Param('id') id: number) {
        return this.subscriptionService.cancelSubscription(id);
    }
}
